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
      axios.get(result.url).then(async (res) => {
        const typesPromises = res.data.types.map((type) =>
          Type.findOrCreate({
            where: { name: type.type.name },
          })
        );
        const types = await Promise.all(typesPromises);
        const pokemon = {
          name: result.name,
          ...res.data,
          types: types.map((type) => type[0]),
        };
        const newPokemon = await Pokemon.create({
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
        });
        await newPokemon.addTypes(types.map((type) => type[0]));
        return newPokemon;
      })
    );
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    pokemons.push(...pokemonDetails);
    nextUrl = response.data.next;
  }
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
    const pokemon = await db.Pokemon.findOne({
      where: { name: toLcName },
      include: { model: db.Type },
    });
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
  weight,
  typeIds
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
    const types = await db.Type.findAll({
      where: {
        typeId: typeIds,
      },
    });
    await pokemon.setTypes(types);

    const createdPokemon = await db.Pokemon.findOne({
      where: {
        pokeId: pokemon.pokeId,
      },
      include: [
        {
          model: db.Type,
          through: {
            attributes: [],
          },
        },
      ],
    });
    return createdPokemon;
  } catch (error) {
    throw new Error("Error creating Pokemon");
  }
};

const getAllTypes = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const types = response.data.results.map((type) => type.name);
    console.log(types);
    if (!types || types.length === 0) {
      throw new Error("Failed to retrieve Pokemon types");
    }
    const createdTypes = await Type.bulkCreate(
      types.map((type) => ({ name: type }))
    );
    console.log("Types added to database");

    return createdTypes.map((type) => type.name);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to retrieve Pokemon types: ${error.message}`);
  }
};
const getDBTypes = async () => {
  try {
    const types = await Type.findAll({
      attributes: ["name"],
    });

    if (!types || types.length === 0) {
      throw new Error("Failed to retrieve Pokemon types");
    }

    return types.map((type) => type.name);
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
  getDBTypes,
};
