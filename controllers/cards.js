const Card = require('../models/card');

const INVALID_DATA = 400;
const DOCUMENT_NOT_FOUND = 404;
const SERVER_ERROR = 500;

function getCards(req, res) {
  Card.find({})
  .populate(['owner', 'likes'])
  .orFail()
  .then(card => res.send(card))
  .catch(error => {
    console.log(`Não foi possível encontrar os cards, ${error}`)
    res.status(DOCUMENT_NOT_FOUND).send({message: `Não foi possível encontrar os cards, ${error}`})
  })
}

function createCard(req, res) {
  const {name, link} = req.body
  const userId = req.user._id

  const linkRegex = /https?:\/\/(www\.)?.{1,}/
  const isValidLink = link.match(linkRegex)

  if(!isValidLink) {
    res.status(INVALID_DATA).send({message: `Não foi possível criar o card ${name}. Link inválido.`})
    return
  }

  Card.create({name, link, owner: userId, likes: [], createdAt: Date.now()})
  .then(card => res.send(card))
  .catch(error => {
    console.log(`Não foi possível criar o card ${name}`)
    res.status(SERVER_ERROR).send({message: `Não foi possível criar o card ${name}`})
  })
}

function deleteCard(req, res) {
  const {cardId} = req.params;

  Card.findByIdAndDelete(cardId)
  .orFail()
  .then(card => res.send(card))
  .catch(error => {
    console.log(`Não foi possível deletar o card com o id ${cardId}`)
    res.status(SERVER_ERROR).send({message:`Não foi possível deletar o card com o id ${cardId}`})
  })

}

module.exports = {getCards, createCard, deleteCard}