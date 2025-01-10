const express = require('express');
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

userRouter.get('/', (req, res) => {
  const users = readUsers();
  if (users.error) {
    return res.status(404).json(users);
  }

  return res.json(users);
});

userRouter.get('/:id', (req, res) => {
  const users = readUsers();
  const { id } = req.params;

  const user = users.find((currentUser) => currentUser._id === id);

  if (users.error) {
    return res.status(404).json(users);
  }

  if (!user) {
    res.status(404).send({ message: `ID do usuário ${id} não encontrado` });
  }

  return res.json(user);
});

module.exports = { userRouter };
