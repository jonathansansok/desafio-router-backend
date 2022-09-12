const express = require("express");
const app = express();

const server = app.listen(8080, () => console.log("server up ejs"));

app.set("views", "./views");
app.set("view engine", "ejs");

let fakeData = [
  { first_name: "asd", last_name: "12", age: 24 },
  { first_name: "234234", last_name: "34", age: 24  },
  { first_name: "23423423423", last_name: "fgf",  },
];
app.get("/", (req, res) => {
  res.render("home", {
    titulo: "EJS Super Partial",
    message: "hello coders",
  });
});

app.get("/users", (req, res) => {
    res.render('users',{
        titulo: "EJS Super",
        users: fakeData
    })
}
)