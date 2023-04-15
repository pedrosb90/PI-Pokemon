import axios from "axios";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_TYPES = "GET_TYPES";

export const getAllPokemons = () => {
  return async function (dispatch) {
    try {
      console.log("Fetching all pokemons...");
      const pokemons = await axios.get(`http://localhost:3001/pokemons`);
      console.log("Fetched all pokemons:", pokemons.data);
      dispatch({
        type: GET_ALL_POKEMONS,
        payload: pokemons.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getPokemonById = (pokeId) => {
  return async function (dispatch) {
    try {
      console.log(`Fetching pokemon with ID ${pokeId}...`);
      const pokemon = await axios.get(
        `http://localhost:3001/pokemons/${pokeId}`
      );
      console.log(`Fetched pokemon with ID ${pokeId}:`, pokemon.data);
      dispatch({
        type: GET_POKEMON_BY_ID,
        payload: pokemon.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/types");
      const types = response.data;
      const typeObjects = types.map((type) => ({ name: type }));

      dispatch({
        type: GET_TYPES,
        payload: typeObjects,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
