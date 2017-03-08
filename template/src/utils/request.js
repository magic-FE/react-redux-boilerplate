import 'whatwg-fetch';

const globalCallbacks = {};
let globalConifg = {};
export const config = (configs) => {
  const callbacksKeys = ['onStart', 'onComplete', 'onSuccess', 'onError'];
  callbacksKeys.forEach((key) => {
    globalCallbacks[key] = typeof configs[key] === 'function' ? configs[key] : () => {};
    delete configs[key];
  });
  globalConifg = configs;
};

export default (url, options) => {
  const { onStart, onComplete, onSuccess, onError } = globalCallbacks;
  const promise = new Promise((resolve, reject) => {
    onStart();
    fetch(url, Object.assign({}, globalConifg, options))
      .then((response) => {
        if (response.ok) {
          response.json().then((result) => {
            onSuccess(result);
            onComplete(null, result);
            resolve(result);
          });
        } else {
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
      if (typeof fn === 'function') fn(result);
    });
    return promise;
  };
  promise.error = (fn) => {
    promise.then(null, (error) => {
      if (typeof fn === 'function') fn(error);
    });
    return promise;
  };
  promise.complete = (fn) => {
    fn = (typeof fn === 'function') ? fn : () => {};
    promise.then((result) => {
      fn(null, result);
    }, (error) => {
      fn(error);
    });
    return promise;
  };
  return promise;
};
