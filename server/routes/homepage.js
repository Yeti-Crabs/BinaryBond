const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepageController');

router.post('/home', homepageController.createRequest, (req, res) => {
    res.status(201).json({ msg: 'Request created'})
})

router.patch('/home', homepageController.update, (req, res) => {
  res.status(200).json({ msg: 'User has been updated!' });
});

router.delete('/home', homepageController.deleteUser, (req, res) => {
  res.status(200).json({ msg: 'User Deleted' });
});

router.delete('/home/requests', homepageController.deleteRequest, (req, res) => {
    res.status(200).json({ msg: 'Request deleted'})
})

router.post('/home/getallusers', homepageController.getAllUsers, (req, res) => {
    res.status(200).json(res.locals.users)
})

router.post('/home/requests', homepageController.displayRequest, (req, res) => {
  res.status(200).json(res.locals.users)
})

module.exports = router;