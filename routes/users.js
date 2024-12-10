import express from 'express'
import path from 'path'
import fs from 'fs'

const __dirname = import.meta.dirname;
const usersPath = path.join(__dirname, '..', 'data', 'users.json')

let users = []

fs.readFile(usersPath, (error, data)=> {
  if (error) {
    console.log(error)
    users = {error: 'Não foi possível ler o arquivo'}
    return
  }

  users = JSON.parse(data)
})

const userRouter = express.Router();

userRouter.get('/', (req, res)=> {
  if (users.error) {
    return res.status(404).json(users)
  }

  return res.json(users)
})

userRouter.get('/:id', (req, res)=> {
  const { id } = req.params

  const user = users.find( currentUser => currentUser.id === id)

  if (users.error) {
    return res.status(404).json(cards)
  }

  if (!user) {
    res.status(404).send({ "message": `ID do usuário ${id} não encontrado` })
  }

  return res.json(users.id)
})

export default userRouter