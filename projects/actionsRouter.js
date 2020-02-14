const express = require("express");

const Actions = require("../data/helpers/actionModel.js");

const router = express.Router();

// 1. Get all actions

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Error retrieving the actions." });
    });
});

router.get("/:id", validateProjectID, (req, res) => {
  res.status(200).json(req.actions);
});

// custom middleware

// validates an action by ID

function validateProjectID(req, res, next) {
  const { id } = req.params;

  Actions.get(id)
    .then(action => {
      if (action) {
        req.actions = action;
        next();
      } else {
        res.status(400).json({ errorMessage: "Invalid ID" });
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "Server error validating project Action ID." });
    });
}

module.exports = router;
