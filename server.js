const express = require("express");

// Projects & Actions Router
const projectsRouter = require("./projects/projectsRouter.js");
const actionsRouter = require("./projects/actionsRouter.js");

const server = express();

server.use(express.json());

// routes - endpoints
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`<h2> Hello</h2>`);
});

module.exports = server;
