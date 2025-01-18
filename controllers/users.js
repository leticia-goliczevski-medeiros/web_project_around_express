const User = require('../models/user');

function getUsers(req, res) {
  User.find({})
  .orFail()
  .then(user => res.send(user))
  .catch(error => {
    console.log(`Não foi possível encontrar usuários: ${error}`)
    res.status(404).send({message: `Não foi possível encontrar usuários: ${error}`})})
}

function getUser(req, res) {
  const { id } = req.params;

  User.findById(id)
  .orFail()
  .then(user => res.send(user))
  .catch((error, id) => {
    console.log(`Não foi possível encontrar o usuário com o id ${id}`)
    res.status(404).send({message: `Não foi possível encontrar o usuário com o id ${id}`})
  })
}

function creatUser(req, res) {
  const {name, about, avatar} = req.body

  User.create({name, about, avatar})
  .orFail()
  .then(user => res.status(201).send(user))
  .catch((error, {name, about, avatar}) => {
    console.log(`Não foi possível criar o usuário ${{name, about, avatar}}`)
    res.status(500).send({message: `Não foi possível criar o usuário ${{name, about, avatar}}`})
  })
}

module.exports = {getUsers, getUser, creatUser}