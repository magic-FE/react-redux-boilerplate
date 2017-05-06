import 'whatwg-fetch';
import { stringify } from 'qs';
// 本工具类只能用于接收和处理json数据，其他数据请使用fetch原生;

const noop = () => { };

let globalCallbacks = {
  onStart: noop,
  onComplete: noop,
  onSuccess: noop,
  onError: noop,
  onSuccessFilter: result => result
};
let globalConifg = {};
export const config = ({
  method = 'GET',
  headers,
  credentials = 'omit',
  body,
  onStart = noop,
  onComplete = noop,
  onError = noop,
  onSuccessFilter = result => result,
  onSuccess = noop
} = {}) => {
  globalCallbacks = {
    onStart,
    onComplete,
    onSuccess,
    onError,
    onSuccessFilter
  };
  globalConifg = {
    method,
    headers,
    body,
    credentials
  };
};
const catchCallbackFn = fn => (params) => {
  try {
    fn(params);
  } catch (error) {
    globalCallbacks.onError(error);
    globalCallbacks.onComplete(error);
    throw error;
  }
};
const request = (
  {
    headers = {},
    credentials = 'omit'
  } = {}) => (urlWithMethod, params = {}) => {
    let [method, url] = urlWithMethod.split(' '); // eslint-disable-line
    const { onStart, onComplete, onSuccess, onError, onSuccessFilter } = globalCallbacks;
    const assignHeaders = globalConifg.headers ? {
      ...globalConifg.headers,
      ...headers
    } : headers;
    const assignBody = globalConifg.body ? {
      ...globalConifg.body,
      ...params
    } : params;
    const options = {
      ...globalConifg,
      headers: assignHeaders,
      method,
      credentials
    };
    assignBody = JSON.stringify(JSON.parse(JSON.stringify(assignBody)));
    if (Object.keys(assignBody).length) {
      if (method.toUpperCase() !== 'GET') {
        options.body = assignBody;
      } else {
        url += `?${stringify(assignBody)}`;
      }
    }
    const promise = new Promise((resolve, reject) => {
      onStart();
      fetch(url, options).then((response) => {
        if (response.ok) {
          response.json().then((result) => {
            const filterResult = onSuccessFilter(result);
            if (Object.prototype.toString.call(filterResult) === '[object Error]') {
              onComplete(filterResult);
              onError(filterResult);
              reject(filterResult);
            } else {
              onSuccess(filterResult);
              onComplete(null, filterResult);
              resolve(filterResult);
            }
          }, (error) => {
            const e = new Error('服务器返回数据错误');
            onComplete(e);
            onError(e);
            reject(e);
            throw new Error(error);
          });
        } else {
          console.log(response);
          const error = new Error(response.statusText);
          error.response = response;
          onError(error);
          onComplete(error);
          reject(error);
        }
      }, (error) => {
        onError(error);
        onComplete(error);
        reject(error);
      });
    });
    promise.success = (fn) => {
      promise.then((result) => {
        if (typeof fn === 'function') catchCallbackFn(fn)(result);
      });
      return promise;
    };
    promise.error = (fn) => {
      promise.then(null, (error) => {
        if (typeof fn === 'function') catchCallbackFn(fn)(error);
      });
      return promise;
    };
    promise.complete = (fn) => {
      fn = (typeof fn === 'function') ? catchCallbackFn(fn) : noop;
      promise.then((result) => {
        fn(null, result);
      }, (error) => {
        fn(error);
      });
      return promise;
    };
    return promise;
  };
export default request;
