// app.js - BFF lambda

const serverless = require('serverless-http');
const express = require('express')
const app = express()
const http = require('http');
const bodyParser = require('body-parser');

const cpasAgreements = [
    {
        "Agreement" : "123456789",
        "Agreement type" : "INCO",
        "Application type" : "APCK",
        "Performance type" : "S",
        "Originator" : "CONTROLDESK",
        "Frequency" : "Daily",
        "Create commission" : true,
        "Commission percentage" : "30%",
        "Start date" : "01/01/2018",
        "End date" : "01/01/2019"
    },
    {
        "Agreement" : "987654321",
        "Agreement type" : "CPAS",
        "Application type" : "APCK",
        "Performance type" : "S",
        "Originator" : "CONTROLDESK",
        "Frequency" : "Monthly",
        "Create commission" : true,
        "Commission percentage" : "10%",
        "Start date" : "01/01/2017",
        "End date" : "01/01/2018"
    }
]

app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


// GET /home endpoint
app.get('/home', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.json({ message: "BFF working!" })
})

// GET cpas agreement
app.get('/agreement/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')

    let agreementId = req.params.id
    res.json(cpasAgreements[agreementId - 1])
})

// POST cpas agreement
app.post('/agreement', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')

    let agreementId = req.body.id
    res.json(cpasAgreements[agreementId - 1])
})

module.exports.handler = serverless(app)
