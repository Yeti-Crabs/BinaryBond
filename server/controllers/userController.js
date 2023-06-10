//sign up

// INSERT INTO users (firstName, lastName, bio, subjects, email, password, skillLevel)
// VALUES ('Adrian', 'Kormier', 'Just some cool dude.', 'Only frontend please', 'wouldntyouliketoknow@gmail.com', 'thisisapassword', 2)

// INSERT INTO users (firstName, lastName, bio, subjects, email, password, skillLevel) VALUES ('$1', '$2', '$3', '$4', '$5', '$6', $7);

// INSERT INTO users (firstName, lastName, bio, subjects, email, password, skillLevel)
// VALUES ('Corso', 'Rosati', 'human', 'JS', 'corsodr@gmail.com', '123', 3)

//login


// SELECT * FROM users WHERE email = 'corsodr@gmail.com' AND password = '123'


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