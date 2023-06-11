const db = require('../models/binarybond')

const loginController = {};

/////////////
// SIGN UP //
// INSERT INTO users (firstName, lastName, bio, subjects, email, password, skillLevel)
// VALUES ('firstNameString', 'lastNameString', 'bioString', 'subjectsString', 'emailString', 'passwordString', skillLevelInteger)
loginController.signUp = async (req, res, next) => {
  try {
      const { firstName, lastName, bio, subject, email, password } = req.body
      const skillLevel = Number(req.body.skillLevel)
      const string = `INSERT INTO users (firstName, lastName, bio, subjects, email, password, skillLevel) VALUES ('${firstName}', '${lastName}', '${bio}', '${subject}', '${email}', '${password}', ${skillLevel})`
      const response = await db.query(string);
      return next();
    } catch (error) {
        next({
        log: 'Express error handler caught error in signup middleware',
        status: 400,
        message: { err: 'An error occurred in signup middleware' },
        })
    }
}

///////////
// LOGIN //
// SELECT * FROM users WHERE email = 'emailString' AND password = 'passwordString'
loginController.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const string = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
        const response = await db.query(string);
        res.locals.user = response.rows[0];
        return next();
    } catch (error) {
        next({
            log: `Error in loginController.login middleware, ${error}`,
            status: 400,
            message: { err: `Error in loginController.login middleware ${error}`},
        })
    }
}

module.exports = loginController;