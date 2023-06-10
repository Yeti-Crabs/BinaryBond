//Get all Users that aren't current users for the middle of the page;


// SELECT (firstName, lastName, bio, subjects, skillLevel) FROM users
// WHERE user_id != 5
// => (Vivek,Patel,"really really good looking person",everything,5)
// => (Corso,Rosati,human,JS,3)
// => (Ryan,C,Eh,None,10)

//Click on checkmark to create request row;

// INSERT INTO requests (user_id, partner_id)
// VALUES (6, 2)

// INSERT INTO requests (user_id, partner_id)
// VALUES (5, 2)

//Who you want to work with/ Who wants to work with you

// who you want to work with 
//SELECT partner_id FROM requests WHERE user_id = 6
// get relevant info from user table, possibly use join 

// who wants to work with you
// SELECT user_id FROM requests WHERE partner_id = 6
// get relevant info from user table

// use request_id to form a url link to csbin.io/binarybond${request_id}


//delete requests

// DELETE * FROM requests 
// WHERE user_id = 5 and partner_id = 'whatever you clicked on'


//Update User Information

// `UPDATE users
// SET subjects = 'JavaScript', bio = 'math'
// WHERE user_id = 3`


// `UPDATE users
// SET subjects = 'JavaScript'
// WHERE user_id = 3`


// `UPDATE users
// SET bio = 'English'
// WHERE user_id = 3`


// UPDATE "users"
// SET bio = 'Still just some cool dude.'
// WHERE email = 'wouldntyouliketoknow@gmail.com' AND password = 'thisisapassword'


//Delete User

// DELETE FROM "users" 

// WHERE email = 'wouldntyouliketoknow@gmail.com' AND password = 'thisisapassword'

// DELETE FROM users WHERE user_id = 3

//SELECT firstName, lastName, 