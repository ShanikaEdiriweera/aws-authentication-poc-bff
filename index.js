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
// TODO: RSA, key generator, store key pair, endpoint to get public key
app.post('/login', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  let username = req.body.username ? req.body.username : false
  let password = req.body.password ? req.body.password : false

  if (!username || !password){
    res.status(400)
    res.json({"error": "Invalid request", "message": "Invalid request"})
  }else if (password !== PASSWORD){
    res.status(401)
    res.json({"error": 'Incorrect password', "message": 'Incorrect password'})
  }else{

    // sign with default (HMAC SHA256)
    let payload = { 
      iat: Math.floor(Date.now() / 1000), // if not provided default will be added
      // iss: 'login token provider lambda', // not needed when options.issuer is added
      // exp: (Date.now() + 24 * 60 * 60 * 1000)/1000, // not needed when options.expiresIn is added
      username: username ? username : ""
    }
    let secretKey = "cpas"
    let options = {
      algorithm: 'HS256', //if not provided default will be added
      expiresIn: 24 * 60 * 60,
      issuer: 'login token provider lambda'
    }

    let token = jwt.sign(payload, secretKey, options)
    console.log("token: "+token)
   
    // sign with RSA SHA256
    // var cert = fs.readFileSync('private.key');  // get private key
    // var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});

    // sign asynchronously
    // jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
      // console.log(token);
    // });
    res.json({"message": "Login successful", "token":token})
  }
})

module.exports.handler = serverless(app);
