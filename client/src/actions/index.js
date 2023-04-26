import axios from "axios";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_TYPES = "GET_TYPES";
export const SET_TYPES = "SET_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const SET_POKEMON = "SET_POKEMON";
export const RESET_POKEMON = "RESET_POKEMON";
export const FILTER_POKEMONS_ORIGIN = "FILTER_POKEMONS_ORIGIN";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const SORT_POKEMONS_AZ = "SORT_POKEMONS_AZ";
export const SORT_POKEMONS_BY_ATTACK = "SORT_POKEMONS_BY_ATTACK";
export const FETCH_ALL_POKEMONS_FAILURE = "FETCH_ALL_POKEMONS_FAILURE";
export const FETCH_POKEMON_ID_FAILURE = "FETCH_POKEMON_ID_FAILURE";
export const CREATE_POKEMON_FAILURE = "CREATE_POKEMON_FAILURE";

export const getAllPokemons = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/pokemons`);
      if (response.status !== 200 || !response.data.length) {
        throw new Error("Pokemons not found.");
      }

      const updatedPokemons = response.data.map((pokemon) => ({
        ...pokemon,
        origin: "api",
      }));
      dispatch({
        type: GET_ALL_POKEMONS,
        payload: updatedPokemons,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALL_POKEMONS_FAILURE,
        payload: error.message,
      });
    }
  };
};
export const getPokemonById = (pokeId) => {
  return async function (dispatch) {
    try {
      if (!/^[1-9]\d*$/.test(pokeId)) {
        throw new Error("Invalid ID format..");
      }
      const pokemon = await axios.get(`/pokemons/${pokeId}`);
      if (!pokemon.data) {
        throw new Error(`Pokemon with ID ${pokeId} does not exist`);
      }
      dispatch({
        type: GET_POKEMON_BY_ID,
        payload: pokemon.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_POKEMON_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      console.log(`Fetching pokemon with Name ${name}...`);
      const pokemon = await axios.get(`/finder?name=${name}`);
      console.log(`Fetched pokemon with Name ${name}:`, pokemon.data);
      dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: pokemon.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const setTypes = (types) => ({
  type: SET_TYPES,
  payload: types,
});

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/types");
      const types = response.data;

      const typeObjects = types.map((type, index) => ({
        name: type,
        typeId: index.toString(),
      }));
      dispatch({
        type: GET_TYPES,
        payload: typeObjects,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const createPokemon = (pokemon) => {
  return async (dispatch) => {
    console.log("Pokemon before POST:", pokemon);

    try {
      const response = await axios.post("/pokemons", pokemon);
      dispatch({
        type: CREATE_POKEMON,
        payload: response.data,
      });
      console.log("Pokemon created OK");
    } catch (error) {
      dispatch({
        type: CREATE_POKEMON_FAILURE,
        payload:
          "Not possible to create a Pokemon right now.. Please try again later.",
      });
    }
  };
};
export const setPokemon = (pokemon) => ({
  type: SET_POKEMON,
  payload: pokemon,
});

export const resetPokemon = () => {
  return {
    type: RESET_POKEMON,
  };
};
export const filterPokemonsOrigin = (originFilter) => {
  return (dispatch, getState) => {
    try {
      const { pokemons } = getState();
      let filtered = [];

      if (originFilter === "api") {
        filtered = pokemons.filter((pokemon) =>
          pokemon.image.includes("raw.githubusercontent.com/PokeAPI")
        );
      } else if (originFilter === "created") {
        filtered = pokemons.filter(
          (pokemon) =>
            !pokemon.image.includes("raw.githubusercontent.com/PokeAPI")
        );
      }
      dispatch({
        type: FILTER_POKEMONS_ORIGIN,
        payload: filtered,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const filterByType = (selectedType) => (dispatch, getState) => {
  try {
    const pokemons = getState().pokemons;

    const filteredPokes = pokemons.filter((poke) => {
      return poke.types.some((type) => type.name === selectedType);
    });
    dispatch({
      type: FILTER_BY_TYPE,
      payload: filteredPokes,
    });
  } catch (error) {
    console.log(error);
  }
};
export const sortPokemonsAZ = (order) => {
  return {
    type: SORT_POKEMONS_AZ,
    payload: order,
  };
};
export const sortPokemonsByAttack = (order) => {
  return {
    type: SORT_POKEMONS_BY_ATTACK,
    payload: order,
  };
};
