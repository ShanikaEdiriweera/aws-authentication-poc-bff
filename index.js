// index.js - login token provider lambda

const serverless = require('serverless-http');
const express = require('express')
const app = express()
const http = require('http');
const bodyParser = require('body-parser');

// import jsonwebtoken from 'jsonwebtoken' 
const jwt = require('jsonwebtoken');

const PASSWORD = 'password'

app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true
}));

// POST method for login
app.post('/login', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  let username = req.body.username ? req.body.username : "user"
  let password = req.body.password ? req.body.password : false
  if (username && password && password !== PASSWORD){
    res.status(401)
    res.send('Incorrect password.')
  }

  // sign with default (HMAC SHA256)
  let payload = { 
    iat: Math.floor(Date.now() / 1000), 
    iss: 'login token provider lambda',
    exp: (Date.now() + 24 * 60 * 60 * 1000)/1000,
    username: 'username' 
  }
  let token = jwt.sign(payload, 'cpas')
  console.log("token: "+token)
  
  //backdate a jwt 30 seconds
  // var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

  // sign with RSA SHA256
  // var cert = fs.readFileSync('private.key');  // get private key
  // var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});

  // sign asynchronously
  // jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
    // console.log(token);
  // });
  res.json({"token":token})
})

module.exports.handler = serverless(app);
