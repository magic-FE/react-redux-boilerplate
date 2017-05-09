import 'whatwg-fetch';
import { stringify } from 'qs';
import type { Credentials, RequestConfig } from '$self-define';
// 本工具类只能用于接收和处理json数据，其他数据请使用fetch原生;

const noop = () => {};

let globalCallbacks = {
  onStart: noop,
  onComplete: noop,
  onSuccess: noop,
  onError: noop,
  onSuccessFilter: result => result,
};
let globalConifg: {
  headers?: {},
  body?: {},
  credentials?: Credentials
} = {};
export const config = (
  {
    headers,
    credentials = 'omit',
    body,
    onStart = noop,
    onComplete = noop,
    onError = noop,
    onSuccessFilter = result => result,
    onSuccess = noop,
  }: RequestConfig = {}
) => {
  globalCallbacks = {
    onStart,
    onComplete,
    onSuccess,
    onError,
    onSuccessFilter,
  };
  globalConifg = {
    headers,
    body,
    credentials,
  };
};

const request = (
  {
    headers = {},
    credentials = 'omit',
  }: {
    headers?: Object,
    credentials?: Credentials
  } = {}
) => (urlWithMethod: string, params?: Object = {}) => {
  if (__DEV__) {
    if (!/[get|post|put|delete]\s+\S*/i.test(urlWithMethod)) {
      throw new Error(
        `
      The url must contains request method, like "GET http://www.xxx.com".
      But received url is "${urlWithMethod}"`
      );
    }
  }
  let [method, url] = urlWithMethod.split(/\s+/);
  const { onStart, onComplete, onSuccess, onError, onSuccessFilter } = globalCallbacks;
  const assignHeaders = globalConifg.headers
    ? {
      ...globalConifg.headers,
      ...headers,
    }
    : headers;
  let assignBody = globalConifg.body
    ? {
      ...globalConifg.body,
      ...params,
    }
    : params;
  const options: Object = {
    ...globalConifg,
    headers: assignHeaders,
    method,
    credentials,
  };
  assignBody = JSON.parse(JSON.stringify(assignBody));
  if (Object.keys(assignBody).length) {
    if (method.toUpperCase() !== 'GET') {
      options.body = JSON.stringify(assignBody);
    } else {
      url += `?${stringify(assignBody)}`;
    }
  }
  const promise = new Promise((resolve, reject) => {
    onStart();
    fetch(url, options).then(
      response => {
        if (response.ok) {
          response.json().then(
            result => {
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
            },
            error => {
              const e = new Error('服务器返回数据错误');
              onComplete(e);
              onError(e);
              reject(e);
              throw new Error(error);
            }
          );
        } else {
          const error = new Error(response.statusText);
          onError(error);
          onComplete(error);
          reject(error);
        }
      },
      error => {
        onError(error);
        onComplete(error);
        reject(error);
      }
    );
  });
  const requestPromise = {};
  requestPromise.success = (fn: Object => void) => {
    promise.then(result => {
      if (typeof fn === 'function') {
        fn(result);
      }
    });
    return requestPromise;
  };
  requestPromise.error = (fn: Error => void) => {
    promise.then(noop, error => {
      if (typeof fn === 'function') {
        fn(error);
      }
    });
    return requestPromise;
  };
  requestPromise.complete = (fn: (?Error, ?Object) => void) => {
    fn = typeof fn === 'function' ? fn : noop;
    promise.then(
      (result: Object) => {
        fn(null, result);
      },
      (error: Error) => {
        fn(error);
      }
    );
    return requestPromise;
  };
  return requestPromise;
};

export default request;
