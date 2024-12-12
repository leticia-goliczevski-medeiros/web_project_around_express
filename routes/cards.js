const express = require('express');
const path = require('path');
const fs = require('fs');

// const __dirname = import.meta.dirname;
const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');

let cards = [];

fs.readFile(cardsPath, (error, data) => {
  if (error) {
    console.log(error);
    cards = { error: 'Não foi possível ler o arquivo' };
    return;
  }

  cards = JSON.parse(data);
});

const cardsRouter = express.Router();

cardsRouter.get('/', (req, res) => {
  if (cards.error) {
    return res.status(404).json(cards);
  }

  return res.json(cards);
});

module.exports = { cardsRouter };
