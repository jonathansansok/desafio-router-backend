const fs = require("fs");

class Container {
  constructor(file) {
    this.file = file;
  }

  async save(object) {
    // ? Recibe un objeto, lo guarda en el archivo y devuelve el id asignado

    try {
      const dataToParse = await fs.promises.readFile(this.file, "utf-8");
      const dataParsed = JSON.parse(dataToParse);
      // * ¿El producto ya existe en el archivo?
      const productFound = dataParsed.find(
        ({ title }) => title === object.title
      );

      if (productFound) {
        // * Si el producto ya existe, lo retorna
        return null;
      } else {
        // * Si no existe, lo agrega y retorna el objeto con id asignado
        object.id = dataParsed.length + 1;
        dataParsed.push(object);
        const updatedFile = JSON.stringify(dataParsed, null, " ");
        fs.promises.writeFile(this.file, updatedFile);
        return object;
      }
    } catch (error) {
      console.error(`Se produjo un error en save:${error}`);
    }
  }

  // ? Recibe un id y modifica el objeto con ese id, por un nuevo objeto ingresado

  async update(idEntered, object) {
    try {
      const dataToParse = await fs.promises.readFile(this.file, "utf-8");
      const dataParsed = JSON.parse(dataToParse);
      // * Se filtran los productos que no cumplen las condiciones (coincidir con el id proporcionado)
      const leakedID = dataParsed.filter(({ id }) => id != idEntered);
      // * Encuentra el producto con el id proporcionado
      const productFound = dataParsed.find(({ id }) => id == idEntered);

      if (productFound) {
        const productFound = { ...object, id: idEntered };
        leakedID.push(productFound);
        // * Se actualiza el archivo
        const updatedFile = JSON.stringify(leakedID, null, " ");
        fs.promises.writeFile(this.file, updatedFile);
        console.log(`Producto ${idEntered} modificado con éxito`, productFound);
        return productFound;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Se produjo un error en saveById:${error}`);
    }
  }

  async getById(idEntered) {
    // ? Recibe un id y devuelve el objeto con ese id, o null si no está

    try {
      const dataToParse = await fs.promises.readFile(this.file, "utf-8");
      const dataParsed = JSON.parse(dataToParse);
      // * ¿El producto ya existe en el archivo?
      const idFound = dataParsed.find(({ id }) => id == idEntered);

      if (idFound) {
        console.log(`Se obtuvo el producto ${idFound.title}`);
        return idFound;
      } else {
        console.log("No se han encontrado productos");
      }
    } catch (error) {
      console.error(`Se produjo un error en getByID: ${error}`);
    }
  }

  async getAll() {
    // ? Devuelve un array con los objetos presentes en el archivo

    try {
      const dataToParse = await fs.promises.readFile(this.file, "utf-8");
      const dataParsed = JSON.parse(dataToParse);

      if (dataParsed.length > 0) {
        // console.log(dataParsed);
        return dataParsed;
      } else {
        console.log("No hay elementos disponibles");
      }
    } catch (error) {
      console.error(`Se ha producido un error en getAll: ${error}`);
    }
  }

  async deleteById(idEntered) {
    // ? Elimina del archivo el objeto con el Id buscado
    try {
      const dataToParse = await fs.promises.readFile(this.file, "utf-8");
      const dataParsed = JSON.parse(dataToParse);
      // * Se filtran los productos que no cumplen las condiciones (coincidir con el id proporcionado)
      const leakedID = dataParsed.filter(({ id }) => id != idEntered);
      // * Encuentra el producto con el id proporcionado
      const idFound = dataParsed.find(({ id }) => id == idEntered);

      if (idFound) {
        console.log(
          `Se ha eliminado el objeto con id:${idEntered} >> [[${idFound.title}]]`
        );
        // * Se actualiza el archivo
        const updatedFile = JSON.stringify(leakedID, null, " ");
        fs.promises.writeFile(this.file, updatedFile);
        return idFound;
      } else {
        console.log(`No se ha encontrado el objeto con id: ${idEntered}`);
      }
    } catch (error) {
      console.error(`Se ha producido un error en deleteById: ${error}`);
    }
  }

  async deleteAll() {
    // ? Elimina todos los objetos presentes en el archivo
    try {
      console.log("Todos los objetos fueron eliminados");
      // * Borrado de todos los objetos (Se sobreescribe el archivo a un array vacío)
      await fs.promises.writeFile(this.file, "[]");
    } catch (error) {
      console.error(`Se ha producido un error en deleteAll: ${error}`);
    }
  }
}

module.exports = Container;
