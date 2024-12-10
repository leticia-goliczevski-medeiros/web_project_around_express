import express from 'express'
import path from 'path';
import fs from 'fs'

const __dirname = import.meta.dirname;
const cardsPath = path.join(__dirname, '..', 'data', 'cards.json')

let cards = []

fs.readFile(cardsPath, (error, data)=> {
  if (error) {
    console.log(error)
    cards = {error: 'Não foi possível ler o arquivo'}
    return
  }

  cards = JSON.parse(data)
})

const router = express.Router()

router.get('/', (req, res)=> {
  if (cards.error) {
    return res.status(404).json(cards)
  }

  return res.json(cards)
})

export default router