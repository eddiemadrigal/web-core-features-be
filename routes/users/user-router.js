const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Users = require('../../data/users-model');

// protected route /api/users
router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Users.find()
        .then( users => {
          users.map( user => {
            res.send( user.username )
          })
        })
    }
  })
});

function verifyToken(req, res, next) {
  // token should be sent in the header as value of Authorization
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;