const { Router } = require("express");
// Importar todos los routers;

// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRouter = require("./pokemons");
const typesRouter = require("./types");
const nameRouter = require("./name");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);
router.use("/finder", nameRouter);

module.exports = router;
