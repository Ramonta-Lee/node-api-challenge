const express = require("express");

const ProjectsDb = require("../data/helpers/projectModel");

const router = express.Router();

// GET Requests:

// 1. Get all Projects
router.get("/", (req, res) => {
  ProjectsDb.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Error retrieving the Projects." });
    });
});

// 2. Get Projects by ID
router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

// Post Requests:

// Add a new Project
router.post("/", validateProject, (req, res) => {
  res.status(200).json(req.projects);
});

// custom middleware
function validateProjectId(req, res, next) {
  const { id } = req.params;
  console.log("id", id);
  ProjectsDb.get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ errorMessage: "Invalid Project ID." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Error retrieving the Project by ID" });
    });
}

function validateProject(req, res, next) {
  const { name, description } = req.body;
  console.log(req.body);
  if (!name || !description) {
    res.status(400).json({
      errorMessage: "Please provide a name and description for the Project."
    });
  } else {
    ProjectsDb.insert(req.body)
      .then(project => {
        next();
      })
      .catch(error => {
        res.status(500).json({ error: "Error adding new Project." });
      });
  }
}

module.exports = router;
