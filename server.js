const express = require("express");
const helmet = require("helmet");
// Projects & Actions Router
const projectsRouter = require("./projects/projectsRouter.js");
const actionsRouter = require("./projects/actionsRouter.js");

const server = express();

// Middleware - Global
server.use(express.json());
server.use(helmet());

// routes - endpoints
server.use("/api/projects", logger, projectsRouter);
server.use("/api/actions", logger, actionsRouter);

server.get("/", greeter, (req, res) => {
  res.send(`<h2> Welcome ${req.me}</h2>`);
});

// custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} Request to ${re.originalUrl}`
  );
  next();
}

function greeter(req, res, next) {
  req.me = "LEE!!!!";
  next();
}

module.exports = server;
