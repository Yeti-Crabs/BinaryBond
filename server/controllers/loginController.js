const db = require('../models/binarybond');

const loginController = {};

/////////////
// SIGN UP //
// INSERT INTO users (firstName, lastName, bio, subjects, email, password, skillLevel)
// VALUES ('firstNameString', 'lastNameString', 'bioString', 'subjectsString', 'emailString', 'passwordString', skillLevelInteger)
loginController.signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const bio = req.body.bio.replace("'", "''");
    const subjects = req.body.subjects.replace("'", "''");
    const skillLevel = Number(req.body.skillLevel);
    const profileurl = req.body.profileurl;
    const string = `INSERT INTO users (firstName, lastName, bio, subject, email, password, skillLevel, profileurl) VALUES ('${firstName}', '${lastName}', '${bio}', '${subjects}', '${email}', '${password}', '${skillLevel}', '${profileurl}')`;
    await db.query(string);
    return next();
  } catch (error) {
    console.error(error);
    next({
      log: 'Express error handler caught error in signup middleware',
      status: 400,
      message: { err: 'An error occurred in signup middleware' },
    });
  }
};

///////////
// LOGIN //
// SELECT * FROM users WHERE email = 'emailString' AND password = 'passwordString'
loginController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const string = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    const response = await db.query(string);
    // console.log('i am req.body',req.body)
    // console.log('i am response.rows[0]',response.rows[0])
    if (
      email !== response.rows[0].email &&
      password !== response.rows[0].password
    ) {
      return next({
        log: `Username or password does not match, ${error}`,
        status: 400,
        message: { err: `Username or password does not match: ${error}` },
      });
    }
    res.locals.user = response.rows[0];
    return next();
  } catch (error) {
    next({
      log: `Error in loginController.login middleware, ${error}`,
      status: 400,
      message: { err: `Error in loginController.login middleware ${error}` },
    });
  }
};

module.exports = loginController;
