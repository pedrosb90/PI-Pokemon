import React, { useState } from "react";
import { Link } from "react-router-dom";
import DetailLink from "../buttons/DetailLink";
import { useSelector, useDispatch } from "react-redux";
import { setPokemon, getPokemonByName } from "../../actions";
import styles from "../../styles/accesories/searchBar.module.css";
import styles3 from "../../styles/cards.module.css";

function SearchPokemon() {
  const [selectedPokemon, setSelectedPokemon] = useState("");

  const dispatch = useDispatch();
  // const found = useSelector((state) => state.pokemonFound);
  const pokemons = useSelector((state) => state.pokemons);
  const menu = pokemons.map((pokemon) => pokemon.name);

  // const foundPoke = pokemons.filter((pokemon) =>
  //   pokemon.name.toLowerCase().includes(selectedPokemon.toLowerCase())
  // );

  const handleSelectPokemon = (event) => {
    setSelectedPokemon(event.target.value);
  };

  const handleFindPokemon = async () => {
    dispatch(getPokemonByName(selectedPokemon));
  };

  const handleReset = () => {
    selectedPokemon("");
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
            <option key={pokemon} value={pokemon}>
              {pokemon}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchPokemon;
