import express from 'express'
import path from 'path';
import {cards} from `${path.join(__dirname, 'cards.json')}` assert { type: 'json' };

const router = express.Router()

router.get('/cards', (req, res)=> {
  res.send(cards)
})

export default router