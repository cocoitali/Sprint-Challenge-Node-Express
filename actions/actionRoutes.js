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

router.post("/", (req, res) => {
    const action = req.body;
    if (action) {
      db
        .insert(action)
        .then(idInfo => {
         db.get(idInfo.id).then(action => {
            res.status(201).json(action);
          });
        })
        .catch(err => {
          res.status(500).json({
            error: "There was an error while saving action to the database"
          });
        });
    } else {
      res.status(400).json({ errorMessage: "Please provide more info" });
    }
  });

  router.put("/:id", (req, res) => {
  const action = req.body;
  const { id } = req.params;
  if (action) {
    db
      .update(id, action)
      .then(count => {
        if (count) {
          db.get(id).then(action => {
            res.json(action);
          });
        } else {
          res
            .status(404)
            .json({ message: "The action with the specified ID does not exist" });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The action information could not be modifed." });
      });
  } else {
    res.status(400).json({ errorMessage: "Please provide more info" });
  }
});


module.exports = router