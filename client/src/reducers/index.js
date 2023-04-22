import {
  GET_ALL_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_TYPES,
  CREATE_POKEMON,
  SET_TYPES,
  GET_POKEMON_BY_NAME,
  SET_POKEMON,
  RESET_POKEMON,
  FILTER_POKEMONS_ORIGIN,
  FILTER_BY_TYPE,
  SORT_POKEMONS_AZ,
  SORT_POKEMONS_BY_ATTACK,
} from "../actions/index.js";

const initialState = {
  pokemons: [],
  pokeDetail: {},
  types: [],
  newPokemon: {},
  pokemonFound: {},
  filtered: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokeDetail: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case SET_TYPES:
      return {
        types: action.payload,
      };
    case CREATE_POKEMON:
      return {
        ...state,
        newPokemon: action.payload,
        pokemons: [...state.pokemons, action.payload],
      };
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonFound: action.payload,
      };
    case SET_POKEMON:
      return {
        pokemonFound: action.payload,
      };
    case RESET_POKEMON:
      return {
        ...state,
        pokemonFound: {},
      };
    case FILTER_POKEMONS_ORIGIN:
      return {
        ...state,
        filtered: action.payload,
      };
    case FILTER_BY_TYPE:
      return {
        ...state,
        filtered: action.payload,
      };

    case SORT_POKEMONS_AZ:
      const order1 = action.payload === "asc" ? 1 : -1;
      const sortedPokemons1 = [...state.pokemons].sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1 * order1;
        }
        if (nameA > nameB) {
          return 1 * order1;
        }
        return 0;
      });
      return {
        ...state,
        pokemons: sortedPokemons1,
        sortOrder: action.payload,
      };

    case SORT_POKEMONS_BY_ATTACK:
      const order = action.payload === "asc" ? 1 : -1;
      const sortedPokemons = [...state.pokemons].sort((a, b) => {
        if (a.attack < b.attack) {
          return -1 * order;
        }
        if (a.attack > b.attack) {
          return 1 * order;
        }
        return 0;
      });
      return {
        ...state,
        pokemons: sortedPokemons,
        sortOrder: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
