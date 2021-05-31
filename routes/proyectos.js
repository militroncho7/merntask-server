const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

//Crea proyectos
//endpoint api/proyectos

router.post('/',
    proyectoController.crearProyecto
);

module.exports = router;