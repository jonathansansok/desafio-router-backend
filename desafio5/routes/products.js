const express = require("express");
//! RUTA ///////////////////////////////////////
const { Router } = express;
const router = Router();
//! CONTENEDOR /////////////////////////////////
const Container = require("../API/Container");
const contenedor = new Container("products.json");
//!  ///////////////////////////////////////////

//? completedFields revisará si el input del formulario o la query recibe todos los parámetros solicitados // Método POST

const completedFields = (req, res, next) => {
    const { title, price, thumbnail } = req.body;
    title && price && thumbnail
      ? next()
      : res.status(300).send({ message: "Debe completar todos los campos" });
  };

//? Routes

//* DEVUELVE TODOS LOS PRODUCTOS ///////////////////////////////////////////////////

router.get("/", async (req, res) => {
    const data = await contenedor.getAll();
    res.status(200).render("products", {products: data});
    
  });
  
  //* DEVUELVE UN PRODUCTO SEGÚN SU ID /////////////////////////////////////////////////
  
  router.get("/:id", async (req, res) => {
    const data = await contenedor.getById(req.params.id);
  
    //! Si el id generado no coincide con ningún producto, devuelve null; de lo contrario, envía la información solicitada
    data
      ? res.status(200).json(data)
      : res.status(404).json({ error: "Producto no encontrado" });
  });
  
  //* RECIBE Y AGREGA UN PRODUCTO, Y LO DEVUELVE CON SU ID ASIGNADO///////////////////////
  
  router.post("/", completedFields, async (req, res) => {
    const { title, price, thumbnail } = req.body;
    const data = await contenedor.save({ title, price, thumbnail });
    data == null
      ? res.status(500).json({ message: ` [[${title}]] ya existe en el archivo` })
      : res.status(200).redirect("index");
  });
  
  //* RECIBE Y ACTUALIZA UN PRODUCTO SEGÚN SU ID //////////////////////////////////////////
  
  router.put("/:id", completedFields, async (req, res) => {
    const { id } = req.params;
    const newObject = req.body;
    const data = await contenedor.update(+id, newObject);
    
    data != null
      ? res.status(200).json({ message: `Producto ${id} modificado con éxito` })
      : res.status(404).json({ error: "Producto no encontrado" });
  
    
  });
  
  //* ELIMINA UN PRODUCTO SEGÚN SU ID //////////////////////////////////////////////////////
  
  router.delete("/:id", async (req, res) => {
    const data = await contenedor.deleteById(req.params.id);
    data
      ? res
          .status(200)
          .send({ message: `Se ha eliminado el producto ${data.title}` })
      : res.status(404).send({ message: "No se ha encontrado el producto" });
  });
  

  module.exports = router