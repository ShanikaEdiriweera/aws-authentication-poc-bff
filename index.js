// index.js

const serverless = require('serverless-http');
const express = require('express')
const app = express()
const http = require('http');
const bodyParser = require('body-parser');

// import jsonwebtoken from 'jsonwebtoken' 
const jwt = require('jsonwebtoken');

app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true
}));

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify({ msg: "working" }));
})

// POST method route
app.post('/data', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.body.username=='vibodha'){
    res.send(JSON.stringify({ msg: "loged in" }));
  }
  else{
    res.send(JSON.stringify({ msg: "wrong" }));
  }
})

// POST method for login
app.post('/login', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // sign with default (HMAC SHA256)
  let token = jwt.sign({ foo: 'bar' }, 'cpas');
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
