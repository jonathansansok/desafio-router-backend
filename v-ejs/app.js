const express = require("express");
const app = express();

const server = app.listen(8080, () => console.log("server up"));

app.set("views", "./views");
app.set("view engine", "pug");
