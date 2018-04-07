import axios from 'axios';
import config from '../config';

const instance = axios.create({
  baseURL: [config.baseURL, config.apiEntry].join('/'),
});

const get = (url, ...args) => wrap(instance.get(url, ...args));
const post = (url, ...args) => wrap(instance.post(url, ...args));
const put = (url, ...args) => wrap(instance.put(url, ...args));
const remove = (url, ...args) => wrap(instance.remove(url, ...args));
const options = (url, ...args) => wrap(instance.options(url, ...args));
const head = (url, ...args) => wrap(instance.head(url, ...args));

export default get;
export {
  post,
  put,
  get,
  remove,
  options,
  head,
};

/**
 * Checkers
 *
 * Return a valid response or throwns an Exception
 */
export function wrap(promise) {
  return promise
    .then(checkRes)
    .then(parseJSON)
    .then(checkJSON);
}

export function checkRes(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.data;
}

export function checkJSON(response) {
  if (response.bOk) {
    return response;
  }

  const error = new Error(response.message);
  error.response = response;
  throw error;
}
