const express = require("express");
const handlebars = require("express-handlebars");
const fs = require("fs");
const app = express();
const server = app.listen(8080, () => console.log("server u"));

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

let llamadaBD = () => {
  return [
    { fname: "Susana", lname: "Oria", age: 25 },
    { fname: "zoina", lname: "boca", age: 525 },
    { fname: "xee", lname: "rock", age: 455 },
  ];
};
app.get("/", (req, res) => {
  res.render("home", {
    name: "Alex",
  });
});

app.get("/users", (req, res) => {
  //llamo a la db
  let users = llamadaBD();
  res.render("users",{
    users: users
  });
});
