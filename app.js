import express from 'express';
const app = express()
const { PORT } = process.env
import router from './routes/cards'
import userRouter from './routes/users'

app.use(express.json())
/* quando uma solicitação com Content-Type do tipo application/json for recebida, express.json() vai converter o dados JSON em um objeto JS e deixá-lo disponível em req.body
 */

app.use('/', (req, res)=> {
  res.status(404).send({ "message":"A solicitação não foi encontrada" })
})
app.use('/cards', router)
app.use('/users', userRouter)

app.listen(PORT, ()=> {
  console.log(`App listening at port ${PORT}`)
})