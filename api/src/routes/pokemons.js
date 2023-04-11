const express = require("express");
const {
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  createPokemon,
} = require("../controllerFunctions/cntrl");

const { Pokemon, Type } = require("../db");

const pokemons = express.Router();

pokemons.get("/", async (req, res) => {
  //   try {
  //     const allPokemons = await getAllPokemons();
  //     console.log(allPokemons);
  //     res.status(200).json(allPokemons);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  try {
    const pokemons = await Pokemon.findAll();
    res.json(pokemons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch pokemons" });
  }
});

pokemons.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json({
      error: "Incorrect Id. Try again with a number from 1 to 100",
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
    const { name, image, life, attack, defense, speed, height, weight } =
      req.body;
    const pokemon = await createPokemon(
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight
    );
    res.status(201).json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating Pokemon");
  }
});

module.exports = pokemons;
