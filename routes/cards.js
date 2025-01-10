const express = require('express');
const path = require('path');
const fs = require('fs');

const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');

function readCards() {
  let cards = [];

  fs.readFile(cardsPath, (error, data) => {
    if (error) {
      console.log(error);
      cards = { error: 'Não foi possível ler o arquivo' };
      return;
    }

    cards = JSON.parse(data);
  });

  return cards;
}

const cardsRouter = express.Router();

cardsRouter.get('/', (req, res) => {
  const cards = readCards();
  if (cards.error) {
    return res.status(404).json(cards);
  }

  return res.json(cards);
});

module.exports = { cardsRouter };
