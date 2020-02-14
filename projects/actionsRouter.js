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

module.exports = router;
