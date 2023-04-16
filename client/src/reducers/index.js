import {
  GET_ALL_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_TYPES,
  CREATE_POKEMON,
  SET_TYPES,
} from "../actions/index.js";

const initialState = {
  pokemons: [],
  pokeDetail: {},
  types: [],
  newPokemon: {},
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

    default:
      return state;
  }
};

export default rootReducer;
