require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')

const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env

const app = express()

app.use(express.json())

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db)
  console.log('db connected!')
})


app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
)

app.post('/auth/register', authCtrl.register)

  
app.listen(SERVER_PORT, () => console.log( `Hi! I'm your server, I'm listening on port: ${SERVER_PORT}`))