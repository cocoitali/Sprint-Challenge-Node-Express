const express = require('express')
const actionDB = require('../data/helpers/actionModel')
const projectDB = require('../data/helpers/projectModel')
const router = express.Router()

router.get('/', (req, res) => {
  actionDB
    .get()
    .then(actions => {
      res.json(actions)
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The actions information can not be retrieved.' })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  actionDB
    .get(id)
    .then(actions => {
      if (actions) {
        res.json(actions)
      } else {
        res.status(404).json({ message: 'This action does not exist.' })
      }
    })
    .catch(() => {
      res
        .status(404)
        .json({ error: 'Information about the action cannot be retrieved.' })
    })
})

router.post('/', (req, res) => {
  const action = req.body
  if (action) {
    projectDB
      .get(action.project_id)
      .then(projects => {
        if (projects) {
          actionDB
            .insert(action)
            .then(action => {
              res.status(201).json(action)
            })
            .catch(() => {
              res.status(500).json({
                error: 'There was an error while saving action to the database.'
              })
            })
        } else {
          res.status(404).json({ message: 'This project does not exist.' })
        }
      })
      .catch(() => {
        res.status(404).json({
          error: 'Information about the project could not be retrieved.'
        })
      })
  } else {
    res.status(400).json({ error: 'Please provide more info' })
  }
})

router.put('/:id', (req, res) => {
  const action = req.body
  const { id } = req.params
  if (action) {
    actionDB
      .update(id, action)
      .then(count => {
        if (count) {
          actionDB.get(id).then(action => {
            res.json(action)
          })
        } else {
          res.status(404).json({
            message: 'The action with the specified ID does not exist.'
          })
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: 'The action information could not be modifed.' })
      })
  } else {
    res.status(400).json({ errorMessage: 'Please provide more info' })
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  actionDB
    .remove(id)
    .then(count => {
      if (count) {
        res.json({ message: 'Action successfully deleted.' })
      } else {
        res
          .status(404)
          .json({ message: 'The action with the specified ID does not exist.' })
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The action could not be removed.' })
    })
})

module.exports = router
