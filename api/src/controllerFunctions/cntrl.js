const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const { Pokemon, Type } = require("../db");

const getAllPokemons = async () => {
  const pokemons = [];
  let nextUrl = "https://pokeapi.co/api/v2/pokemon?limit=100";
  while (pokemons.length < 100 && nextUrl) {
    const response = await axios.get(nextUrl);
    const pokemonDetailsPromises = response.data.results.map((result) =>
      axios.get(result.url).then((res) => ({
        name: result.name,
        ...res.data,
      }))
    );
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    const newPokemons = pokemonDetails.map((pokemon) => ({
      id: uuidv4(),
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      life: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      height: pokemon.height,
      weight: pokemon.weight,
    }));
    console.log(newPokemons);
    pokemons.push(...newPokemons);
    nextUrl = response.data.next;
  }
  await Pokemon.bulkCreate(pokemons);
  console.log("All pokemons added to database");
  return pokemons;
};
async function getPokemonById(req, res) {
  // Code to retrieve a specific pokemon by ID
}

async function getPokemonByName(req, res) {
  // Code to retrieve a specific pokemon by name
}

async function createPokemon(req, res) {
  // Code to create a new pokemon
}

async function getAllTypes(req, res) {
  // Code to retrieve all pokemon types from the PokeAPI
}

module.exports = {
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  createPokemon,
  getAllTypes,
};
