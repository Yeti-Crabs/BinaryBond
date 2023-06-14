const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepageController');

// Default /api in server
router.post('/', (req, res, next) => {
  res.status(201).json({ msg: 'Request created' });
  next();
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
