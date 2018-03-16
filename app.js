// app.js - BFF lambda

const serverless = require('serverless-http');
const express = require('express')
const app = express()
const http = require('http');
const bodyParser = require('body-parser');

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

module.exports.handler = serverless(app);
