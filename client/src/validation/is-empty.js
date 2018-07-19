const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

//React uses ES6 ( as oppossed to node using Common.js) so no 'module.exports' needed
export default isEmpty;
