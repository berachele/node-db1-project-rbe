const express = require("express");

const AcctRouter = require('../accounts/account-router.js')

// const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use('/api/accounts', AcctRouter)

server.get('/', (req, res) => {
    res.status(200).json({api: "Successfully is up!"})
})

module.exports = server;
