const { Router } = require('express');
// Importar todos los routers;
/*const { videogameRouter } = require('../routes/videogameRouter')*/
const { genresRouter } = require("../routes/genresRouter")
const { platformsRouter } = require("../routes/platformsRouter")
// Ejemplo: const authRouter = require('./auth.js');
const express = require("express");
const {getGamesById,getGamesByName,getAllVideogames,getGamesByGenero,createVideogame} = require("../controllers/videogames");
const {getAllGenres} = require("../controllers/genres");
const {getAllPlatforms} = require("../controllers/platforms");

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());
router.get("/videogames/:idVideogame",getGamesById);
router.get("/videogames/name/:name",getGamesByName);
router.get("/videogames", getAllVideogames); 
router.post("/videogames", createVideogame); 

router.get("/videogames/genres/:filtrogenres",getGamesByGenero);
router.get("/genres", getAllGenres);   
router.get("/platforms", getAllPlatforms);   


//router.use('/videogames', videogameRouter);
/*router.use('/genres', genresRouter);
router.use('/platforms', platformsRouter);*/
module.exports = router;
