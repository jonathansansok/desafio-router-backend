
const express = require("express");
const app = express();
const Contenedor = require("./routes/Contenedor.js")
/* const userRouter = require('./routes/users')
const petsRouter = require('./routes/pets')
const fileRouter= require('./routes/files') */
const ContenedorRouter = require("./routes/Contenedor")

const contenedor = new Contenedor("misproductos.json");

app.get("/", async (req, res) => {

	const allProducts = await contenedor.getAll();

	res.status(200).json(allProducts);

});                   


app.use(express.json());//es un middleware
app.use('/content', express.static('public')) //es un middleware
/* app.use('/users', userRouter);
app.use('/pets', petsRouter);
app.use('/files', fileRouter); */
app.use('/contenedor', ContenedorRouter);
const router = express.Router();

app.get('/', (req, res) => {
  res.send('Welcome todos'); 
});

const server = app.listen(8080, () => console.log("server up!!"));

server.on("error", (error) => console.log(`Error con el servidor`));

let numeroAleatorio = 0;
let productoRandom = [];
const fileSystem = new Contenedor("misproductos.json");

const main = async () => {
  const productos = await fileSystem.getAll();

  router.get("/productos", (req, res) => {
    res.json(productos);
  });
  router.get("/productsRandom", (req, res) => {
    numeroAleatorio = Math.floor(Math.random() * productos.length) + 1;
    productoRandom = productos.find((prod) => prod.id === numeroAleatorio);
    res.json(productoRandom);
  });
};

main();
