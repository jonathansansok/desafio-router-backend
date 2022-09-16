const express = require("express");
const { Router } = express;
const router = Router();
const productsRoute = require("./products")



//? MAIN FORM
// router.use("/", (req, res)=>{
//     res.render("index")
//   })

//? Route: PRODUCTS

router.use("/api/products", productsRoute)


module.exports = router