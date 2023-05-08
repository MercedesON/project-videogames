const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const {getGamesByName,getAllVideogames} = require("../controllers/videogames")

router.get("/all",getAllVideogames)
router.get("/:name",getGamesByName)
//router.get("/detail/:id",getGamesByName)

module.exports = router;
