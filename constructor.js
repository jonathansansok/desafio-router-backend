const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  save(objeto) {
    const contenido = fs.readFileSync(this.archivo, "utf-8");
    const productos = JSON.parse(contenido);
    const id = productos.length + 1;
    const producto = { id, ...objeto };
    productos.push(producto);
    fs.writeFileSync(this.archivo, JSON.stringify(productos, null, 2));
    return id;
  }

  getById(id) {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    const objeto = dataParseada.find((objeto) => objeto.id === id);
    return objeto;
  }

  getAll() {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    return dataParseada;
  }

  deleteById(id) {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    const dataFiltrada = dataParseada.filter((objeto) => objeto.id !== id);
    const dataString = JSON.stringify(dataFiltrada);
    fs.writeFileSync(this.archivo, dataString);
    return dataFiltrada;
  }

  deleteAll() {
    fs.writeFileSync(this.archivo, "[]");
    return "[]";
  }

  getRandom() {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    let random = dataParseada[Math.floor(Math.random() * dataParseada.length)];
    return random;
  }

  updateById(id, objetoNuevo) {
    const data = fs.readFileSync(this.archivo, "utf-8");
    let dataParseada = JSON.parse(data);
    let productoViejo = dataParseada.find((objeto) => objeto.id === id);
    let mensaje = "Se reemplazo el producto";
    if (productoViejo === undefined) {
      throw { msg: "404 Not found" };
    }
    let productosFiltrados = dataParseada.filter((objeto) => objeto.id !== id);
    productoViejo = { id, ...objetoNuevo };
    productosFiltrados.push(productoViejo);
    fs.writeFileSync(this.archivo, JSON.stringify(productosFiltrados, null, 2));
    return mensaje;
  }
}

// const contenedor = new Contenedor("productos.txt");

// const producto1 = {
//   title: "Escuadra",
//   price: 123.45,
// };

// contenedor.save(producto1);
// console.log(contenedor.getById(3));
// contenedor.deleteById(3);
// console.log(contenedor.getAll());
// contenedor.deleteAll();
// contenedor.getAll();

module.exports = Contenedor;
