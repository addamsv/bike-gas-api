/**
 * 
 * @param {*} res 
 * @returns 
 */
function LoggerHelper(res) {
  Logger.log(res);

  return typeof res?.getContent === 'function' ? res.getContent() : res;
}