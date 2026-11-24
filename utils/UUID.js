/**
 * 
 * @param {boolean} isIdShouldBeLong 
 * @returns {string}
 */
const getUUID = (isIdShouldBeLong = false) => {
  if (isIdShouldBeLong) {
    // Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return Utilities.getUuid();
  }

  const timePart = Date.now().toString(36); // Время в 36-ричной системе

  const randomPart = Math.random().toString(36).substring(2, 6); // 4 случайных символа

  return `${timePart}-${randomPart}`; // Пример: "m3k9x1a-8f2p"
};

if (typeof module !== 'undefined') { module.exports = { getUUID }; }
