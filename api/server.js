const express = require('express');
const jwt = require('jsonwebtoken');
const server = express();

const registerRouter = require('../routes/register/register-router');
const loginRouter = require('../routes/login/login-router');
const userRouter = require('../routes/users/user-router');

server.use(express.json());

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.json({ message: 'API running ...'})
  res.send();
});

module.exports = server;