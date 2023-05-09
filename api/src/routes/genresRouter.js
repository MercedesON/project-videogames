const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const express = require("express");
const {getAllGenres} = require("../controllers/genres");

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());
router.get("/genres", getAllGenres);         

module.exports = router;
