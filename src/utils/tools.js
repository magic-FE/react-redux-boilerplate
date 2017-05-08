export const toUnderCase = str => str.replace(/([A-Z])/g, '_$1').toUpperCase();
export const toCamelCase = str => str.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase()); // eslint-disable-line

export default {
  toUnderCase,
  toCamelCase,
};
