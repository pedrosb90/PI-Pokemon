const express = require("express");
const { getPokemonByName } = require("../controllerFunctions/cntrl");

const { Pokemon, Type } = require("../db");

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
    if (error.message.includes("Name must not contain numbers")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = pokemons;
