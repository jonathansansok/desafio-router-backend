const express = require('express');

const router = express.Router();
const users = []
//localhost/users/

//creacion de un middleware
const middlewareCoder = (req, res, next) =>{
    console.log('peticion recibida');
    if(true)    next()
    else res.status(404).send({message: 'error'});
}

router.get('/', middlewareCoder, (req, res) =>{
    res.send({users})
})

//localhost/users
router.post('/', (req, res) =>{
    let user = req.body
    users.push(user);
    res.send({message: 'user created', userCreated: user})

})

//users/vip
/* router.get('/vip', (req, res) =>{
    res.send('vip desde la ruta users')

}) */

module.exports = router;
