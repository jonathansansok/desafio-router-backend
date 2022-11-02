const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const fs = require("fs");
const fsPromise = fs.promises;
const Contenedor = require("./constructor");
const constructor = new Contenedor("./productos.txt");
const productosRouter = require("./productos");
const { Server: SocketServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));
////////cookies/////////////////
const cookieParser= require('cookie-parser')

//Array del chat
let mensajes = [{email: "bienvenida@chat.com", msg: "Bienvenido al chat", date: "01/01/2021 00:00:00"}];
  
/////////////////////////
// SOCKET IO ////////////
/////////////////////////

io.on("connection", (socket) => {
  console.log("Se ha conectado un cliente");
  socket.emit('new-message', mensajes);
  socket.emit('new-product', constructor.getAll());
  socket.on('new-message', (data) => {
    console.log(data);
    mensajes.push(data);
    io.sockets.emit('new-message', mensajes);
    fs.writeFile('./mensajes.txt', JSON.stringify(mensajes), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
  socket.on('new-product', async (data) => {
   await constructor.save(data);
   const productos = await constructor.getAll();
    io.sockets.emit('new-product', productos);
  });
});


// HANDLE BARS VIEWS

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    layoutsDir: __dirname + "/views",
    defaultLayout: "main",
  })
);

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("root", {
    layout: "root",
    title: "Página principal",
    Precio: "Precio",
    addProd: "Añadir Producto",
    compras: constructor.getAll().sort((a, b) => a.id - b.id),
    noProd: "No hay productos",
    partialsPath: __dirname + "/views/partials",
  });
});
////cokie!
app.use(cookieParser());
app.use(express.json());
app.post('/cookies', (req, res) => {
  let cookie = req.body // { name: 'oreo', value: 'Coder was here', duration: 5 }
  if (!cookie.name || !cookie.value || !cookie.duration) return res.send({ err: 'Faltan valores' })
  res.cookie(cookie.name, cookie.value, { maxAge: cookie.duration*1000}).send({message: 'Galleta creada'})
})

app.get('/cookies', (req, res) => {
  res.send(req.cookies)
})

app.delete('/cookies/:name', (req, res) => {
  res.clearCookie(req.params.name).send({message: 'Cookie deleted!'})
})
///termina cookie

//EMPIEZA SESSION

app.use(express.json())
app.use(session({
    secret: 'c0d3r',
    cookie: { maxAge: 50000 },
    resave: true,
    saveUninitialized: true
}))

app.get('/connect', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        return res.send({ message: `Hola de nuevo. Esta es tu visita ${req.session.counter}`})
    }
    req.session.counter = 1
    res.send({ messge: `Bienvenido! Esta es la ${req.session.counter}era vez que nos visitas!`})
})

app.get('/login', (req, res) => {
    let { username , password } = req.query
    //buscar el user en la BD
    if (username!=='alex' || password!='coder') {
        return res.send({err: 'Usuario o contraseña incorrectos'})
    }
    req.session.user = {
        username,
        role: 'admin'
    }
    res.send({message: 'Usuario logueado correctamente'})
})

const isAdmin = (req, res, next) => {
    if (req.session.user&&req.session.user.role==='admin') return next()
    else return res.status(401).send({err: 'No autorizado'})
}

app.get('/ruta-secreta', isAdmin, (req, res) => {
    res.send({message: "Si estas autorizado!"})
})

//TERMINA SESSION



// EXPRESS ROUTER 

app.use("/productos", productosRouter);


// SERVER ON ////////////

httpServer.listen(3000, () => {
  console.log("Server ON");
});
