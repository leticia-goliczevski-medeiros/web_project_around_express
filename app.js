const express = require('express')
const app = express()
const { PORT } = process.env

app.listen(PORT, ()=> {
  console.log(`App listening at port ${PORT}`)
})