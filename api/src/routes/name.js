const express = require("express");
const { getPokemonByName } = require("../controllerFunctions/cntrl");

const pokemons = express.Router();

pokemons.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ error: 'Missing or empty "name" query parameter' });
    }

    const pokemon = await getPokemonByName(name);

    if (!pokemon) {
      return res.status(404);
    }
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = pokemons;
