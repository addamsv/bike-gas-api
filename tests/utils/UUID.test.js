const { getUUID } = require('../../utils/UUID');

describe('generate long ID', () => {
  test("ID should be mocked-uuid-1234", () => {
    const result = getUUID(true);
    expect(result).toBe('mocked-uuid-1234');
  });
});