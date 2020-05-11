const express = require('express')

const db = require("../data/dbConfig.js");

const router = express.Router()

router.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            message: err.message
        })
    })
})

router.get('/:id', (req, res) => {
    db('accounts').where({id: req.params.id})
    .first()
    .then(account => {
        if(account){
            res.status(200).json({
                data: account
            })
        } else{
            res.status(404).json({message: "No accounts with that ID were found"})
        }
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            message: err.message
        })
    })
})

router.post('/', (req, res) => {
    //need to have name and budget included to be added
    const account = req.body
    if (isValidAccount(account)) {
        db('accounts')
        .insert(account, "id")
        .then(newAcct => {
            res.status(201).json({
                data: newAcct
            })
        })
        .catch(err => {
            console.log({err})
            res.status(500).json({
                message: err.message
            })
        })
    } else{
        res.status(400).json({
            message: "Please provide name and budget for the account"
        })
    }
})

router.put('/:id', (req, res) => {
    const editAcct = req.body
    db('accounts').where({id: req.params.id})
    .update(editAcct)
    .then(account => {
        if(account > 0){
            res.status(200).json({data: account})
        }else{
            res.status(404).json({
                message: "Account not found by that ID"
            })
        }
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            message: err.message
        })
    })
})

router.delete('/:id', (req, res) => {
    db('accounts').where({id: req.params.id})
    .del()
    .then(account => {
        if(account > 0){
            res.status(200).json({data: account})
        } else{
            res.status(404).json({
                message: "Account not found by that ID"
            })
        }
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            message: err.message
        })
    })
})

function isValidAccount(account){
    return Boolean(account.name && account.budget)
}

module.exports = router;