import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetPokemon, getPokemonByName, getPokemonById } from "../../actions";
import styles from "../../styles/accesories/searchBar.module.css";
import { useHistory } from "react-router-dom";

function SearchPokemon() {
  const [selectedPokemon, setSelectedPokemon] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const pokemons = useSelector((state) => state.pokemons);
  const menu = pokemons.map((pokemon) => pokemon.name);
  const pokemonFound = useSelector((state) => state.pokemonFound);

  const handleSelectPokemon = (event) => {
    setSelectedPokemon(event.target.value);
  };

  const handleFindPokemon = async () => {
    await dispatch(getPokemonByName(selectedPokemon));

    if (pokemonFound && pokemonFound.pokeId) {
      history.push(`/pokemon/${pokemonFound.pokeId}`);
    }
  };
  const handleReset = () => {
    dispatch(resetPokemon());
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className={styles.button}
          onClick={handleFindPokemon}
          disabled={!selectedPokemon}
        >
          Find
        </button>
        <button
          type="reset"
          className={styles.button}
          onClick={handleReset}
          disabled={!selectedPokemon}
        >
          Reset
        </button>
        <select
          value={selectedPokemon}
          onChange={handleSelectPokemon}
          className={styles.box}
        >
          <option value="">--Pokemon Name.. --</option>
          {menu.map((pokemon) => (
            <option key={pokemon.uuid} value={pokemon}>
              {pokemon}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchPokemon;
