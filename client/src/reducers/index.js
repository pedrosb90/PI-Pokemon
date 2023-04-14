import { GET_ALL_POKEMONS, GET_POKEMON_BY_ID } from "../actions/index.js";

const initialState = {
  pokemons: [],
  pokeDetail: {},
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
    default:
      return state;
  }
};

export default rootReducer;
