const db = require('../models/binarybond')

const homepageController = {}

////////////////////////////
// SELECT all other users //
//STRING = SELECT (firstName, lastName, bio, subjects, skillLevel) FROM users WHERE user_id != ${user_id}
// SELECT
// firstName, lastName, bio, subjects, skillLevel
// FROM
//     users
// WHERE NOT EXISTS (
//     SELECT user_id, partner_id
//     FROM
//         requests
//     WHERE
//         user_id = ${user_id) AND
//         
// )

homepageController.getAllUsers = async (req,res,next) => {
  try {
    const {user_id} = req.body
    const string = `SELECT firstName, lastName, bio, subjects, skillLevel FROM users WHERE user_id != ${user_id}`
    const response = await db.query(string)
    res.locals.users = response.rows
    return next()
  } catch (error) {
    return next({
      log: 'Express error handler caught error in getAllUsers middleware',
      status: 400,
      message: { err: 'An error occurred in getAllUsers middleware' },
      })
  }
}


///////////////////////////////////////////////
// Click on check mark to create request row //
homepageController.createRequest = async (req,res,next)=>{
  try {
    const {user_id,partner_id} = req.body
    const string = `INSERT INTO requests (user_id, partner_id)
    VALUES (${user_id}, ${partner_id}) WHERE user_id != ${user_id} AND partner_id != ${partner_id}`
    const response = await db.query(string)
    return next()
  } catch (error) {
    return next({
      log: 'Express error handler caught error in createRequest middleware',
      status: 400,
      message: { err: 'An error occurred in createRequest middleware' },
      })
  }
}

//Who you want to work with/ Who wants to work with you

homepageController.displayRequest = async (req,res,next) => {
try {
  const {user_id} = req.body
  const wantToWorkWith = `SELECT partner_id FROM requests WHERE user_id = ${user_id}`
  const wantsToWorkWithYOU = `SELECT partner_id FROM requests WHERE partner_id = ${user_id}`
  const response1 = await db.query(wantToWorkWith)
  const response2 = await db.query(wantsToWorkWithYOU)
  res.locals.users = { wantToWorkWith: response1, wantsToWorkWithYOU: response2};
  return next()
} catch (error) {
  next({
    log: 'Express error handler caught error in displayRequest middleware',
    status: 400,
    message: { err: 'An error occurred in displayRequest middleware' },
    })
}


// {incoming:{},outgoing:{}}
}

// homepageController.displayOutgoingRequest = async (req,res,next)=>{
//   const {user_id} = req





// }

// who you want to work with 
//SELECT partner_id FROM requests WHERE user_id = 6
// get relevant info from user table, possibly use join 

// who wants to work with you
// SELECT user_id FROM requests WHERE partner_id = 6
// get relevant info from user table

// use request_id to form a url link to csbin.io/binarybond${request_id}


/////////////////////
// Delete requests //
// DELETE * FROM requests 
// WHERE user_id = 5 and partner_id = 'whatever you clicked on'
homepageController.deleteRequest = async (req, res, next) => {
    try {
        const { user_id, partner_id } = req.body;
        const string = `DELETE FROM requests WHERE user_id = '${user_id}' AND partner_id = '${partner_id}'`
        const response = await db.query(string);
        return next();
    }
    catch (error) {
    return next({
        log: 'Express error handler caught error in deleteRequest middleware',
        status: 400,
        message: { err: 'An error occurred in deleteRequest middleware' },
        })
    }
}

/////////////////////////////
// UPDATE user information //
// `SET subjects = 'subjectString', bio = 'bioString'
// WHERE user_id = user_idSerial`
homepageController.update = async (req, res, next) => {
  try {
    const { user_id, bio, subjects } = req.body;
    const string = `UPDATE users SET bio = '${bio}', subjects = '${subjects}' WHERE user_id = ${user_id}`;
    const response = await db.query(string);
    return next()
  } catch (error) {
    return next({
      log: 'Express error handler caught error in update middleware',
      status: 400,
      message: { err: 'An error occurred in update middleware' },
      })
  }
}
/////////////////
// Delete User //
// DELETE FROM users
// WHERE user_id = user_idSerial OR partner_id = partner_idSerial
homepageController.deleteUser = async (req,res,next) => {
  try {
    // const {user_id} = req.body;
    const user_id = Number(req.body.user_id)
    // The first string removes all of user's active requests from 'requests' table, while the second string removes the user from 'users' table.
    const string1 = `DELETE FROM requests WHERE user_id = ${user_id} OR partner_id = ${user_id}`
    const string2 = `DELETE FROM users WHERE user_id = ${user_id}`
    const response1 = await db.query(string1)
    const response2 = await db.query(string2)
    return next()
  } catch (error) {
    return next({
      log: 'Express error handler caught error in deleteUser middleware',
      status: 400,
      message: { err: 'An error occurred in deleteUser middleware' },
      })
  }
}

module.exports = homepageController;