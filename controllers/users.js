const User = require('../models/user');

const INVALID_DATA = 400;
const DOCUMENT_NOT_FOUND = 404;
const SERVER_ERROR = 500;

function getUsers(req, res) {
  User.find({})
  .orFail()
  .then(user => res.send(user))
  .catch(error => {
    console.log(`Não foi possível encontrar usuários: ${error}`)
    res.status(DOCUMENT_NOT_FOUND).send({message: `Não foi possível encontrar usuários: ${error}`})})
}

function getUser(req, res) {
  const { id } = req.params;

  User.findById(id)
  .orFail()
  .then(user => res.send(user))
  .catch((error, id) => {
    console.log(`Não foi possível encontrar o usuário com o id ${id}`)
    res.status(DOCUMENT_NOT_FOUND).send({message: `Não foi possível encontrar o usuário com o id ${id}`})
  })
}

function createUser(req, res) {
  const {name, about, avatar} = req.body

  const avatarRegex = /https?:\/\/(www\.)?.{1,}/
  const isAvatarValid = avatar.match(avatarRegex)

  if (!isAvatarValid) {
    res.status(INVALID_DATA).send({message: `Não foi possível criar o usuário ${name}. Link do avatar inválido.`})
    return
  }

  User.create({name, about, avatar})
  .then(user => res.status(201).send(user))
  .catch((error, {name, about, avatar}) => {
    console.log(`Não foi possível criar o usuário ${{name, about, avatar}}`)
    res.status(SERVER_ERROR).send({message: `Não foi possível criar o usuário ${name}`})
  })
}

module.exports = {getUsers, getUser, createUser}