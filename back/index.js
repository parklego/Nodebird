const express = require("express");
const db = require("./models");
const app = express();
db.sequelize.sync();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello, express");
});
app.get("/about", (req, res) => {
  res.send("Hello, about!");
});
app.listen(port, () => {
  console.log(`server is running on http://localhot:${port}`);
});
