const express = require('express');

const cardsRouter = express.Router();

cardsRouter.get('/', (req, res) => {
  // const cards = readCards();
  if (cards.error) {
    return res.status(404).json(cards);
  }

  return res.json(cards);
});

module.exports = { cardsRouter };
