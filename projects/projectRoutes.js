const express = require("express")
const db = require('../data/helpers/projectModel')
const router = express.Router()

router.get('/', (req, res) => {
  db  
    .get()
    .then(projects => {
      res.json(projects)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The project information could not be retrieved'})
    })
})


module.exports = router