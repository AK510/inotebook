//commands to start nodemon
// npx nodemon@latest index.js 
// npx nodemon@latest --version


//connect with database
const connectToMongo = require('./db');
const express = require('express');

var cors = require('cors')
//method of DB
connectToMongo();

const app = express()
const port = 5000

//allows user to make api req from browser
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//if /api/auth endpoint used then run auth.js
app.use('/api/auth', require('./routes/auth'))
//for api/notes endpoint
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})