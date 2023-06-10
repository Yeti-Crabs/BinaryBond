const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


// route to controllers
router.post('/', loginController.signUp, (req, res) => {
  res.status(201).json({ msg: 'Hey you signed up' });
});


router.get('/', loginController.signIn, (req, res) => {
  res.status(200).json(res.locals.user);
});

module.exports = router;