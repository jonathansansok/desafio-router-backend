const express = require("express");
const app = express();

const server = app.listen(8080, () => console.log("server up"));

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
    let {min, max, nivel, titulo} = req.query
  res.render("home", {
    min,
    nivel,
    max,
    titulo
  });
});
