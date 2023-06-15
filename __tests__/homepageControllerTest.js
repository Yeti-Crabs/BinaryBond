const db = require('server/server.js');
const homepageController = require('../server/controllers/homepageController');

jest.mock('../server/models/binarybond.js', () => ({
  query: jest.fn(),
}));

describe('getAllUsers middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { user_id: 123 } };
    res = { locals: {} };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all other users and store them', async () => {
    const response = {
      rows: [
        {
          user_id: 1,
          firstName: 'Bob',
          lastName: 'Bob',
          bio: 'A',
          subjects: '',
          skillLevel: '1',
          email: 'test@example.com',
        },
      ],
    };

    db.query.mockResolvedValue(response);

    await homepageController.getAllUsers(req, res, next);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining(
        'SELECT user_id, firstName, lastName, bio, subjects, skillLevel, email FROM users WHERE user_id !='
      )
    );
    expect(res.locals.users).toEqual(response.rows);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call the error handler when an error occurs', async () => {
    const error = new Error('Database query failed');

    db.query.mockRejectedValue(error);

    await homepageController.getAllUsers(req, res, next);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      log: 'Express error handler caught error in getAllUsers middleware',
      status: 400,
      message: { err: 'An error occurred in getAllUsers middleware' },
    });
    expect(next).toHaveBeenCalledTimes(1);
  });
});
