const express = require('express')

const db = require("../data/dbConfig.js");

const router = express.Router()

router.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            message: err.message
        })
    })
})

router.get('/:id', (req, res) => {})

router.post('/', (req, res) => {})

router.put('/:id', (req, res) => {})

router.delete('/:id', (req, res) => {})


module.exports = router;