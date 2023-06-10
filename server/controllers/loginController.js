const db = require('../models/binarybond')

const loginController = {};

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

//SIGN UP//

// INSERT INTO users (firstName, lastName, bio, subjects, email, password, skillLevel)
// VALUES ('Adrian', 'Kormier', 'Just some cool dude.', 'Only frontend please', 'wouldntyouliketoknow@gmail.com', 'thisisapassword', 2)

// INSERT INTO users (firstName, lastName, bio, subjects, email, password, skillLevel) VALUES ('$1', '$2', '$3', '$4', '$5', '$6', $7);

// INSERT INTO users (firstName, lastName, bio, subjects, email, password, skillLevel)
// VALUES ('Corso', 'Rosati', 'human', 'JS', 'corsodr@gmail.com', '123', 3)


//LOGIN//

// SELECT * FROM users WHERE email = 'corsodr@gmail.com' AND password = '123'

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