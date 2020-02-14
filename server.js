const express = require("express");

// Projects & Actions Router
const projectsRouter = require("./projects/projectsRouter.js");

const server = express();

server.use(express.json());

// routes - endpoints
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send(`<h2> Hello</h2>`);
});

module.exports = server;
