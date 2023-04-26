const express = require("express");
const {
  getAllPokemons,
  getPokemonById,
  createPokemon,
} = require("../controllerFunctions/cntrl");

const { Pokemon, Type } = require("../db");

const pokemons = express.Router();

pokemons.get("/", async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll({
      include: [{ model: Type, as: "types" }],
    });

    if (pokemons.length > 0) {
      res.json(pokemons);
    } else {
      const allPokemons = await getAllPokemons();
      res.status(200).json(allPokemons);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch pokemons" });
  }
});

pokemons.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json({
      error: "Invalid Id",
    });
    return;
  }
  try {
    const pokemon = await getPokemonById(id);
    res.json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `No Pokemons were found with Number ${id}. Please insert a valid Id`,
    });
  }
});

pokemons.post("/", async (req, res) => {
  try {
    const {
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      typeIds,
    } = req.body;
    const pokemon = await createPokemon(
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      typeIds,
      "created"
    );
    res.status(201).json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating Pokemon");
  }
});

module.exports = pokemons;
