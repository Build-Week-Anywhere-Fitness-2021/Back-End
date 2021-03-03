const router = require('express').Router();
const Users = require('./users-model');
const restricted = require('../middleware/restricted-middleware');
const {valUserId} = require('../middleware/idValidation');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', valUserId, restricted, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;