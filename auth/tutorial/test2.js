const express = require('express')
const path = require('path')
const router = express.Router()
const bodyParser = require('body-parser')

const session = require('express-session')

const { FusionAuthClient } = require('fusionauth-node-client')
const client = new FusionAuthClient(
   'Rbjw_h-Ja2EtjWQNSyZr4V9CvRdA3HUhowy-2Seu24nZWZ9h7Rm3V8mf',
   'http://localhost:9011'
)

const app = express()
applicationId = '3dc54ebc-9885-49d7-95e4-89b6bf270ef2'

const data = {
   user: null,
   token: null
}

app.use(session({
   secret: 'fusionauth',
   resave: false,
   saveUninitialized: true
}))


app.get('/', function (req, res) {
   res.send('Hello World!')
})

app.get('/logout', function (req, res) {
   req.session.destroy()
   res.send("Successfully logged out")
})

app.get('/login', function (req, res) {
   if (req.session.user) {
      console.log('user: ', req.session.user)
      res.send("We already have a user")
   } else {
      const obj = {
         'loginId': req.query.user,
         'password': req.query.password,
         'applicationId': applicationId
      }
      client.login(obj)
         .then(function (clientResponse) {
            req.session.user = clientResponse.successResponse.user
            req.session.token = clientResponse.successResponse.token
            console.log(JSON.stringify(clientResponse.successResponse, null, 8))
            res.redirect('/profile')
         })
         .catch(function (error) {
            console.log("ERROR: ", JSON.stringify(error, null, 8))
            res.send("Login failure")
         })

   }
})

app.get('/profile', function (req, res) {
   if (!req.session.user) {
      res.send("Login required")
   } else {
      res.send("Profile")
   }
})

app.listen(3000, function () {
   console.log('FusionAuth example app listening on port 3000!')
})