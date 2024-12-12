const express = require('express');
const { cardsRouter } = require('./routes/cards');
const { userRouter } = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/cards', cardsRouter);
app.use('/users', userRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
