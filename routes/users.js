const express = require('express');
const {getUsers, getUser, createUser} = require('../controllers/users')
const path = require('path');
const fs = require('fs');

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

function readUsers() {
  let users = [];

  fs.readFile(usersPath, (error, data) => {
    if (error) {
      console.log(error);
      users = { error: 'Não foi possível ler o arquivo' };
      return;
    }

    users = JSON.parse(data);
  });
  return users;
}

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', createUser)

module.exports = { userRouter };
