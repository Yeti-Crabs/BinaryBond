const express = require('express');
const router = express.Router();

// Default /api in server

router.post('/create-tokens', async (req, res, next) => {
  try {
    const { code } = req.body;
    res.send(code);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
