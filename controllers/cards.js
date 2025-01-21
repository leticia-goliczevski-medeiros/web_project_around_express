const Card = require('../models/card');

function getCards(req, res) {
  Card.find({})
  .populate(['owner', 'likes'])
  .orFail()
  .then(card => res.send(card))
  .catch(error => {
    console.log(`Não foi possível encontrar os cards, ${error}`)
    res.status(404).send({message: `Não foi possível encontrar os cards, ${error}`})
  })
}

function createCard(req, res) {
  const {name, link} = req.body
  const userId = req.user._id

  Card.create({name, link, owner: userId, likes: [], createdAt: Date.now()})
  .then(card => res.send(card))
  .catch(error => {
    console.log(`Não foi possível criar o card ${{name, link}}`)
    res.status(404).send({message: `Não foi possível criar o card ${{name, link}}`})
  })
}

function deleteCard(req, res) {
  const {cardId} = req.params;

  Card.findByIdAndDelete(cardId)
  .orFail()
  .then(card => res.send(card))
  .catch(error => {
    console.log(`Não foi possível deletar o card com o id ${cardId}`)
    res.status(500).send({message:`Não foi possível deletar o card com o id ${cardId}`})
  })

}

module.exports = {getCards, createCard, deleteCard}