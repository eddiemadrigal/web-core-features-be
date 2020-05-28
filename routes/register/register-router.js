const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../data/users-model');

// for end points beginning with /api/register
router.post('/', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

module.exports = router;