const express = require("express");
const app = express();
const morgan = require("morgan");
const indexAPI = require("./routes/index");
/////SOCKET////
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3000;
//? SETTINGS ///////////////////////////////////////////
const server = app.listen(PORT, () => console.log(`server up on ${PORT}`));
/* app.set("port", 8080); */ //* Configuración puerto// cambio a 3000

const io = new Server(server);

let history = [];

io.on("conecction", (socket) => {
  console.log(`new user coneccted!!!!!: ${socket.id}`);
  socket.broadcast.emit('newUser') //para emitir a todos menos a ti mismo 
  socket.on('message', data => {
    history.push(data)
    socket.emit('history', history)
  })
}); 

app.set("json spaces", 2); //* JSON formatter
app.set("views", __dirname + "/views");

//? MIDDLEWARES ///////////////////////////////////////

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/", express.static(__dirname + "/public"));

//? CONFIGURACIÓN EXTRA HBS ///////////////////////////

const { engine } = require("express-handlebars");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: __dirname + "/views/layouts/layout.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/includes",
  })
);

//? VIEW ENGINES /////////////////////////////////////

//!app.set('view engine', 'pug')
app.set("view engine", "ejs");
// app.set('view engine', 'hbs')

//? ROUTES ///////////////////////////////////////////

app.use("/", indexAPI);
app.use("/", (req, res) => {
  res.render("index");
});

//? STARTING SERVER ///////////////////////////////////

/* const server = app.listen(app.get("port"), () => {
  console.log(`Servidor express iniciado en puerto ${app.get("port")}`);
}); */

//? ERROR HANDLER ////////////////////////////////////////

server.on("error", (error) => {
  console.log(`Error !!!: ${error}`);
});
