const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// route to controllers

router.post('/', userController.signUp, (req, res) => {
  res.status(201).json({ msg: 'Hey you signed up' });
});


router.get('/', userController.signIn, (req, res) => {
  res.status(200).json(res.locals.user);
});

router.patch('/', userController.update, (req, res) => {
  res.status(200).json(res.locals.user);
});

router.delete('/', userController.delete, (req, res) => {
  res.status(200).json({ msg: 'User Deleted' });
})