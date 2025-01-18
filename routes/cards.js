const express = require('express');
const {getCards, createCard, deleteCard} = require('../controllers/cards')

const cardsRouter = express.Router();

cardsRouter.get('/', getCards);

cardsRouter.post('/', createCard);

cardsRouter.delete('/:id', deleteCard)

module.exports = { cardsRouter };
