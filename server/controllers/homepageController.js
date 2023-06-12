const db = require('../models/binarybond');

const homepageController = {};

////////////////////////////
// SELECT all other users //
homepageController.getAllUsers = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const string = `SELECT user_id, firstName, lastName, bio, subjects, skillLevel, email FROM users WHERE user_id != ${user_id}`;
    const response = await db.query(string);
    res.locals.users = response.rows;
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught error in getAllUsers middleware',
      status: 400,
      message: { err: 'An error occurred in getAllUsers middleware' },
    });
  }
};



///////////////////////////////////////////////
// Click on check mark to create request row //
homepageController.createRequest = async (req, res, next) => {
  try {
    const { user_id, partner_id } = req.body;
    const string = `INSERT INTO requests (user_id, partner_id)
    SELECT ${user_id}, ${partner_id}
    WHERE NOT EXISTS (
    SELECT 1 FROM requests
    WHERE user_id = ${user_id} AND partner_id = ${partner_id}
    )`;
    const response = await db.query(string);
    console.log(response.rowCount)
    if (response.rowCount === 0) {
      next({
        log: 'Create request, user has already been requested',
        status: 400,
        message: { err: 'An error occurred in createRequest middleware,user has been requested' },
      })
    }
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught error in createRequest middleware',
      status: 400,
      message: { err: 'An error occurred in createRequest middleware' },
    });
  }
};

///////////////////////////////////////////////
// Display who you want to work with (outgoing requests) and 
// who wants to work with you (incoming requests)
homepageController.displayRequest = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const wantsToWorkWithYOU = `SELECT DISTINCT users.*, requests.request_id FROM users INNER JOIN requests ON requests.partner_id = users.user_id AND requests.user_id = ${user_id}`;
    const wantToWorkWith = `SELECT DISTINCT users.*, requests.request_id FROM users INNER JOIN requests ON requests.user_id = users.user_id AND requests.partner_id =${user_id}`;
    const response1 = await db.query(wantsToWorkWithYOU);
    const response2 = await db.query(wantToWorkWith);
    res.locals.users = { wantToWorkWith: response2.rows, wantsToWorkWithYOU: response1.rows };
    return next();
  } catch (error) {
    next({
      log: 'Express error handler caught error in displayRequest middleware',
      status: 400,
      message: { err: 'An error occurred in displayRequest middleware' },
    });
  }
};

/////////////////////
// Delete requests //
// DELETE * FROM requests 
// WHERE user_id = currentUser_id and partner_id = 'whatever you clicked on'
homepageController.deleteRequest = async (req, res, next) => {
  try {
    const { user_id, partner_id } = req.body;
    const string = `DELETE FROM requests WHERE user_id = '${user_id}' AND partner_id = '${partner_id}' OR user_id = '${partner_id}' AND partner_id = '${user_id}'`;
    const response = await db.query(string);
    return next();
  }
  catch (error) {
    return next({
      log: 'Express error handler caught error in deleteRequest middleware',
      status: 400,
      message: { err: 'An error occurred in deleteRequest middleware' },
    });
  }
};

/////////////////////////////
// UPDATE user information //
// `SET subjects = 'subjectString', bio = 'bioString'
// WHERE user_id = user_idSerial`
homepageController.update = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const bio = req.body.bio.replace('\'', '\'\'');
    const subjects = req.body.subjects.replace('\'', '\'\'');
    const string = `UPDATE users SET bio = '${bio}', subjects = '${subjects}' WHERE user_id = ${user_id}`;
    const response = await db.query(string);
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught error in update middleware',
      status: 400,
      message: { err: 'An error occurred in update middleware' },
    });
  }
};
/////////////////
// Delete User //
// DELETE FROM users
// WHERE user_id = user_idSerial OR partner_id = partner_idSerial
homepageController.deleteUser = async (req, res, next) => {
  try {
    // const {user_id} = req.body;
    const user_id = Number(req.body.user_id);
    // The first string removes all of user's active requests from 'requests' table, while the second string removes the user from 'users' table.
    const string1 = `DELETE FROM requests WHERE user_id = ${user_id} OR partner_id = ${user_id}`;
    const string2 = `DELETE FROM users WHERE user_id = ${user_id}`;
    const response1 = await db.query(string1);
    const response2 = await db.query(string2);
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught error in deleteUser middleware',
      status: 400,
      message: { err: 'An error occurred in deleteUser middleware' },
    });
  }
};

module.exports = homepageController;