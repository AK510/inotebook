//commands to start nodemon
// npx nodemon@latest index.js 
// npx nodemon@latest --version


//connect with database
const connectToMongo = require('./db');
const express = require('express');

//method of DB
connectToMongo();

const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//if /api/auth endpoint used then run auth.js
app.use('/api/auth', require('./routes/auth'))
//for api/notes endpoint
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})