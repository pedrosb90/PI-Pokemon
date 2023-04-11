const express = require("express");
const { getAllPokemons } = require("../controllerFunctions/cntrl");
const { Pokemon } = require("../db");

const pokemons = express.Router();

pokemons.get("/", async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.json(pokemons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch pokemons" });
  }
});

pokemons.get("/:id", async (req, res) => {
  try {
  } catch (err) {}
});

pokemons.get("/", async (req, res) => {
  try {
  } catch (err) {}
});
pokemons.post("/", async (req, res) => {
  try {
  } catch (err) {}
});

module.exports = pokemons;
