const express = require('express');
const {getUsers, getUser, createUser} = require('../controllers/users')

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', createUser)

module.exports = { userRouter };
