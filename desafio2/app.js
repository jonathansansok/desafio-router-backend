const express = require("express");
const fs = require("fs");
const app = express();
const server = app.listen(8080, () => console.log('server u'));

app.use(express.static("public"));

app.engine('cte', (filePath, ObjectToReplace, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(new Error(err));
    const template = content
      .toString()
      .replace("^^titulo$$", ObjectToReplace.titulo)
      .replace("^^mensaje$$", ObjectToReplace.mensaje);
    return callback(null, template);
  })
})

app.set('views', './views')
app.set('view engine', 'cte')

app.get('/', (req, res) => {
  res.render('Bienvenida', {
    titulo: "PLANTILLA CUSTOM",
    mensaje: "hello custom template"
  })
})

let numeroAleatorio = 0;
let productoRandom = [];
const fileSystem = new Contenedor("misproductos.json");

const main = async () => {
  const productos = await fileSystem.getAll();

  app.get("/productos", async (req, res) => {
    const allProducts = await contenedor.getAll();

    res.status(200).json(allProducts);
  });


  app.get("/productosRandom", (req, res) => {
    numeroAleatorio = Math.floor(Math.random() * productos.length) + 1;
    productoRandom = productos.find((prod) => prod.id === numeroAleatorio);
    res.json(productoRandom);
  });
};

main();



