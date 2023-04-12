const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const db = require("../db");
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
      uuid: uuidv4(),
      pokeId: pokemon.id,
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

const getPokemonById = async (id) => {
  let pokemon = await Pokemon.findOne({
    where: { pokeId: id },
    include: [{ model: Type, as: "types" }],
  });

  if (!pokemon) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await axios.get(apiUrl);
    const pokemonDetails = response.data;

    const newPokemon = {
      pokeId: pokemonDetails.id,
      uuid: uuidv4(),
      name: pokemonDetails.name,
      image: pokemonDetails.sprites.front_default,
      life: pokemonDetails.stats[0].base_stat,
      attack: pokemonDetails.stats[1].base_stat,
      defense: pokemonDetails.stats[2].base_stat,
      speed: pokemonDetails.stats[5].base_stat,
      height: pokemonDetails.height,
      weight: pokemonDetails.weight,
    };

    const createdPokemon = await Pokemon.create(newPokemon);
    const types = pokemonDetails.types.map((type) => type.type.name);
    await createdPokemon.addTypes(types);

    pokemon = createdPokemon;
  }

  return pokemon;
};

async function getPokemonByName(name) {
  const toLcName = name.toLowerCase();
  if (/\d/.test(toLcName)) {
    throw new Error(`Invalid name '${name}'. Name must not contain numbers`);
  }
  try {
    const pokemon = await db.Pokemon.findOne({ where: { name: toLcName } });

    if (pokemon) {
      return pokemon;
    } else {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      if (response.status !== 200) {
        throw new Error(`Pokemon '${name}' not found`);
      }

      const stats = response.data.stats || [];
      const sprites = response.data.sprites || {};

      const newPokemon = await createPokemon(
        response.data.name,
        sprites.front_default || null,
        stats[0]?.base_stat || null,
        stats[1]?.base_stat || null,
        stats[2]?.base_stat || null,
        stats[5]?.base_stat || null,
        response.data.height || null,
        response.data.weight || null
      );
      return newPokemon;
    }
  } catch (error) {
    throw new Error(`No Pokemon found with the name ${name}`);
  }
}

const createPokemon = async (
  name,
  image,
  life,
  attack,
  defense,
  speed,
  height,
  weight
) => {
  try {
    const pokemon = await db.Pokemon.create({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    console.log(pokemon);
    return pokemon;
  } catch (error) {
    throw new Error("Error creating Pokemon");
  }
};

const getAllTypes = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const types = response.data.results.map((type) => type.name);

    if (!types || types.length === 0) {
      throw new Error("Failed to retrieve Pokemon types");
    }

    const dbTypes = await Promise.all(
      types.map(async (name) => {
        const [dbType, created] = await db.Type.findOrCreate({
          where: { name },
        });

        if (created) {
          const typeResponse = await axios.get(
            `https://pokeapi.co/api/v2/type/${name}`
          );
          const pokemonUrls = typeResponse.data.pokemon.map(
            (entry) => entry.pokemon.url
          );
          const pokemonIds = pokemonUrls.map((url) => url.split("/")[6]);

          const dbPokemon = await db.Pokemon.findAll({
            where: { pokeId: pokemonIds },
          });

          await dbType.setPokemon(dbPokemon);
        }

        return dbType;
      })
    );

    return dbTypes;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to retrieve Pokemon types: ${error.message}`);
  }
};

module.exports = {
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  createPokemon,
  getAllTypes,
};
