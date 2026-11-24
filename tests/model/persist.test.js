const {
  getByHeaderName,
  findAll,
  findById,
  deleteById,
  updateById,
  create
} = require('../../model/persist');

describe('persist', () => {
  test("getByHeaderName", () => {
    const result = getByHeaderName("Peter", "user_name", "Users")
    /*{
      collectionName: 'Users',
      status: 'success',
      retData: {
        id: 4,
        user_name: 'Peter',
        user_pass: '99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e',
        user_role: 'qa',
        user_email: 'a@a.a'
      }
    }*/

    expect(result.collectionName).toBe('Users');
    expect(result.status).toBe('success');
    expect(result.retData.id).toBe(4);
    expect(result.retData.user_name).toBe('Peter');
    expect(result.retData.user_pass).toBe(undefined);
    expect(result.retData.user_role).toBe('qa');
    expect(result.retData.user_email).toBe('a@a.a');
  });

  test("findAll", () => {
    const result = findAll("Users")
    /*{
      collectionName: 'Users',
      status: 'success',
      retData: [
          {
            id: 1,
            user_name: 'Sergey',
            user_role: 'moderator',
            user_email: 'a@a.a',
            iat: undefined,
            roles: undefined,
            enabled: undefined,
            name: undefined,
            phone: undefined
          },
          ...
        ]
      }
    }*/

    expect(result.collectionName).toBe('Users');
    expect(result.status).toBe('success');
    expect(Array.isArray(result.retData)).toBe(true);

    result.retData.forEach((user) => {
      expect(user).toMatchObject({
        id: expect.any(Number),
        user_name: expect.any(String),
        user_role: expect.any(String),
        user_email: expect.any(String),
      });
    });
  });

  test("findById", () => {
    const result = findById('7', "Users")
    /*{
      collectionName: 'Users',
      status: 'success',
      retData: {
        id: 4,
        user_name: 'Peter',
        user_pass: '99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e',
        user_role: 'qa',
        user_email: 'a@a.a'
      }
    }*/

    expect(result.collectionName).toBe('Users');
    expect(result.status).toBe('success');
    expect(typeof result === 'object' && result !== null && !Array.isArray(result.retData)).toBe(true);

    expect(result.retData).toMatchObject({
      id: 7,
      user_name: 'Polina',
      user_role: 'user',
      user_email: 'a@a.a',
      iat: undefined,
      roles: undefined,
      enabled: undefined,
      name: undefined,
      phone: undefined
    });

  });

  test("updateById", () => {
    const before = findById('7', "Users");
    const result = updateById('7', "Users", { "user_name": "Vas" })
    const after = findById('7', "Users");

    expect(result.collectionName).toBe('Users');
    expect(result.status).toBe('success');
    expect(before.retData.user_name).toBe('Polina');
    expect(after.retData.user_name).toBe('Vas');
  });

  test("deleteById", () => {
    const before = findById('7', "Users");
    const result = deleteById('7', "Users");
    const after = findById('7', "Users");

    expect(result.collectionName).toBe('Users');
    expect(result.status).toBe('success');
    expect(after.status).toBe('fail');
  });

  test("create", () => {
    const result = create(
      {
        user_name: 'Sergy',
        user_role: 'moderator',
        user_email: 'a@a.a',
        iat: undefined,
        roles: undefined,
        enabled: undefined,
        name: undefined,
        phone: "133-97-17"
      },
      "Users"
    );

    /*{
      collectionName: 'Users',
      status: 'successfully created',
      retData: {
        id: 'mws04yb7-tk4z',
        user_name: 'Sergy',
        user_pass: '',
        user_role: 'moderator',
        user_email: 'a@a.a',
        iat: '',
        roles: '',
        enabled: '',
        name: '',
        phone: '133-97-17'
      }
    }*/

    expect(result.collectionName).toBe('Users');
    expect(result.status).toBe('successfully created');
    expect(result.retData).toMatchObject({
      id: expect.any(String),
      user_name: 'Sergy',
      user_role: 'moderator',
      user_email: 'a@a.a',
      iat: "",
      roles: "",
      enabled: "",
      name: "",
      phone: "133-97-17"
    });

    // result.retData.forEach((user) => {
    //   expect(user).toMatchObject({
    //     id: expect.any(Number),
    //     user_name: expect.any(String),
    //     user_role: expect.any(String),
    //     user_email: expect.any(String),
    //   });
    // });
  });
});