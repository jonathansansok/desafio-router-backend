const express = require("express");
const app = express();

const server = app.listen(8080, () => console.log("server up ejs"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");

let productos = [];

app.get("/", (req, res) => {
  res.render("home", {
    productos: productos,
  });
});
app.post("/", (req, res) => {
  productos.push(req.body);
  res.redirect("/");
});

app.get("/productos", (req, res) => {
  res.render("home", {
    productos: productos,
  });
});

app.post("/productos", (req, res) => {
  productos.push(req.body);
  res.redirect("/");
});
