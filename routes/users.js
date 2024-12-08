import express from 'express'
import path from 'path';
import {users} from `${path.join(__dirname, 'users.json')}` assert { type: 'json' };

const userRouter = express.Router();

userRouter.get('/users', (req, res)=> {
  res.send(users)
})

userRouter.get('/users/:id', (req, res)=> {
  const { _id } = req.params

  const user = users.find( currentUser => currentUser._id === _id)

  if (!user || !_id) {
    res.status(404).send({ "message": "ID do usuário não encontrado" })
  }
})

export default userRouter