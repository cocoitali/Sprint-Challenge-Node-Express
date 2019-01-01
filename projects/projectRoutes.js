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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(projects => {
      if (projects) {
        res.json(projects);
      } else {
        res.status(404).json({ message: "project does not exist" });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ error: "Information about the project could not be retrieved." });
    });
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params
  db
    .getProjectActions(id)
    .then(actions => {
      if (actions) {
        res.json(actions)
      } else {
        res
          .status(404)
          .json({ message: 'Action does not exist'})
      }
    })
    .catch(err => {
      res.status(404).json({ error: 'Info about this action could not be retrieved'})
    })
})

router.post("/", (req, res) => {
  const project = req.body;
  if (project) {
    db
      .insert(project)
      .then(idInfo => {
        db.get(idInfo.id).then(project => {
          res.status(201).json(project);
        });
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the project to the database"
        });
      });
  } else {
    res.status(400).json({ errorMessage: "Please provide description and name for project" });
  }
});


module.exports = router