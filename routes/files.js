const express = require('express');
const router = express.Router();
const multer = require('multer');
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/img')
    },
    filename: function(req, file, cb) { 
        cb(null, Date.now()+"-"+file.originalname)
    }
})

/* router.get('/', (req, res) =>{
    res.send({pets})
}) */

let uploader = multer({storage})


router.post('/', uploader.array('files',3), (req, res) =>{
    res.send({message: 'ok, archivo subido'})
})

module.exports = router;
