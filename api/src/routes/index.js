const { Router } = require("express");

const pokemonsRouter = require("./pokemons");
const typesRouter = require("./types");
const nameRouter = require("./name");

const router = Router();

router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);
router.use("/finder", nameRouter);

module.exports = router;
