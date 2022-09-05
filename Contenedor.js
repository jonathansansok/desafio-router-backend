const fs = require("fs");
const router = express.Router();
class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async save(object) {
    // Recibo objeto, lo guarda en archivo y da el ID que se asigna

    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    // Ver si el producto ya existe
    const productFound = dataParsed.find(({ title }) => title == object.title);

    try {
      if (productFound) {
        // * Si Producto existe, avisa por consola y no lo agrega
        console.log("El producto ya existe en el archivo");
      } else {
        // * Si no existe, lo agrega y retorna el id asignado
        object.id = dataParsed.length + 1;
        dataParsed.push(object);
        const updatedFile = JSON.stringify(dataParsed, null, " ");
        fs.writeFileSync(this.file, updatedFile);
        console.log(
          `Se agregó el producto: ${object.title} y su id es ${object.id}`
        );
        return object.id;
      }
    } catch (error) {
      console.log(`Error  detectado en save:${error}`);
    }
  }

  async getById(idEntered) {
    // ? Recibo un ID y muestro si está, si no se imprime Null.

    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    // Compruebo si el producto ya existe en el archivo
    const idFound = dataParsed.find(({ id }) => id === idEntered);

    try {
      if (idFound) {
        console.table(idFound);
        return idFound;
      } else {
        console.log("No se ha encontrado el producto");
        return null;
      }
    } catch (error) {
      console.error(`Error sobre la funcion getByID: ${error}`);
    }
  }

  async getAll() {
    // ? Devuelve un array con todos los objetos que hay en el .JSON

    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);

    try {
      if (dataParsed.length > 0) {
        console.log(dataParsed);
        return dataParsed;
      } else {
        console.log("No tienes elementos en lista");
      }
    } catch (error) {
      console.error(`Error sobre la función getAll: ${error}`);
    }
  }

  async deleteById(idEntered) {
    // ? Elimina del archivo el objeto con el Id buscado

    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    // * Se filtran los productos que no cumplen las condiciones
    const leakedID = dataParsed.filter(({ id }) => id !== idEntered);
    // * Encuentra el producto con el id que se provee
    const idFound = dataParsed.find(({ id }) => id === idEntered);

    try {
      if (idFound) {
        console.log(
          `Se eliminó el objeto que tenía el id:${idEntered} >> [[${idFound.title}]]`
        );
        // * Se actualiza el .JSON
        const updatedFile = JSON.stringify(leakedID, null, " ");
        fs.writeFileSync(this.file, updatedFile);
      } else {
        console.log(`No se encontró el objeto con id: ${idEntered}`);
      }
    } catch (error) {
      console.log(`Error en función en deleteById: ${error}`);
    }
  }

  async deleteAll() {
    console.log("Se han eliminado todos los objetos");
    // * Borrado de todos los objetos (Se sobreescribe el archivo a un array vacío)
    await fs.writeFileSync(this.file, "[]");
  }
}

const file = "./misproductos.json";
const contenedor = new Contenedor(file);

let nuevoObjeto = {
  title: "hola",
  price: 111111111111,
  thumbnail:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Peugeot_RCZ_%28Facelift%29_%E2%80%93_Frontansicht%2C_7._Dezember_2014%2C_Ratingen.jpg/1920px-Peugeot_RCZ_%28Facelift%29_%E2%80%93_Frontansicht%2C_7._Dezember_2014%2C_Ratingen.jpg",
};

//primero desbloquee una funcion y luego en consola ejecute node index.js
//contenedor.save(nuevoObjeto);
 //contenedor.getById(2)
//  contenedor.getAll();
// contenedor.deleteById(3)
// contenedor.deleteAll()
module.exports = Contenedor