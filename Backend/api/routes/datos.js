const express = require('express');
const router = express.Router();

/*Enruta todos los controladores,creando los endpoints.*/
const { getRoles, getTipos_documentos } = require('../controllers/datos');
router

    .get("/roles", getRoles)

    .get("/tipos_documentos", getTipos_documentos)


module.exports = router;