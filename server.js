const cluster = require("cluster");
const os = require("os");
const express = require("express");

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const port = 8002;

  app.get("/", (req, res) => {
    return res.send(`Hello, Completed by pid ${process.pid}`);
  });

  app.listen(port, () => {
    console.log(`Server running at ${port}`);
  });
}
