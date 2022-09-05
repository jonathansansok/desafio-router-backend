const express = require('express');

const router = express.Router();
let pets = []

router.get('/', (req, res) =>{
    res.send({pets})
})

router.post('/', (req, res) =>{
    let pet = req.body
    pets.push(pet);
    res.send({message: 'pet created', userCreated: pet})

})

module.exports = router;
