const express = require('express')
const db = require('../data/helpers/actionModel')
const router = express.Router()

router.get('/', (req, res) => {
    db
        .get()
        .then(actions => {
            res.json(actions)
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The actions information can not be retrieved"})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db
        .get(id)
        .then(actions => {
            if (actions) {
                res.json(actions)
            } else {
                res.status(404).json({ message: 'action does not exist'})
            }
        })
        .catch(err => {
            res
                .status(404)
                .json({ error: 'Information about the action cannot be retrieved'})
        })
})

module.exports = router