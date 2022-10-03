const options = require("./options/mysql.config");
const options2 = require("./options/sqlite3.config");
const knex = require("knex");

const database = knex(options);

//ESTO DE ABAJO no se como se integra o si tengo que usar como.
/* const processDB = async () => {
  let existTable = await database.schema.hasTable('articulos')
  if (existTable) {
      await database.schema.dropTable('articulos')
  }
  await database.schema.createTable('articulos', table => {
      table.increments('id')
      table.string('nombre', 15).nullable(false)    
      table.string('codigo', 10).nullable(false)    
      table.float('precio')
      table.integer('stock')
  })
  await database('articulos').insert(articulos)
  let results = JSON.parse(JSON.stringify(await database.from('articulos').select('*')))
  console.log(results)
  await database.from('articulos').where('id', 3).del()
  await database.from('articulos').where('id', 2).update({stock: 0})
  database.destroy()
}

processDB() */

class Contenedor {
  constructor(productos, table) {
    this.db = knex(productos);
    this.table = table;
  }

  save(objeto) {
    database("productos")
      .insert(producto)
      .then((result) => console.log(result))
      .catch((err) => console.log(err))
      .finally(() => database.destroy());
  }

  getById(id) {
    database
      .from("productos")
      .select("*")
      .where("id", "1")
      .then((data) => console.log(JSON.parse(JSON.stringify(data))))
      .catch((err) => console.log(err))
      .finally(() => database.destroy());
  }

  getAll() {
    database
      .from("productos")
      .select("*")
      .then((data) => console.log(JSON.parse(JSON.stringify(data))))
      .catch((err) => console.log(err))
      .finally(() => database.destroy());
  }

  deleteById(id) {
    database
      .from("productos")
      .where("price", "<", 25000)
      .del()
      .then(() => console.log("producto deleted!"))
      .catch((err) => console.log(err))
      .finally(() => database.destroy());
  }

  /*   deleteAll() {
    fs.writeFileSync(this.archivo, "[]");
    return "[]";
  }

  getRandom() {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    let random = dataParseada[Math.floor(Math.random() * dataParseada.length)];
    return random;
  } */

  updateById(id, objetoNuevo) {
    database
      .from("productos")
      .where("name", "Mercedes")
      .update({ price: 10000 })
      .then(() => console.log("producto updated!"))
      .catch((err) => console.log(err))
      .finally(() => database.destroy());
  }
}

// const contenedor = new Contenedor("productos.txt");

// const producto1 = {
//   title: "Escuadra",
//   price: 123.45,
// };

// contenedor.save(producto1);
//console.log(contenedor.getById(3));
// contenedor.deleteById(3);
// console.log(contenedor.getAll());
// contenedor.deleteAll();
// contenedor.getAll();

module.exports = Contenedor;
