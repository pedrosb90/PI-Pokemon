import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonByName } from "../../actions";
import styles from "../../styles/accesories/searchBar.module.css";
import { Redirect } from "react-router-dom";

function SearchPokemon() {
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const menu = pokemons.map((pokemon) => pokemon.name);
  const pokemonFound = useSelector((state) => state.pokemonFound);

  const handleSelectPokemon = (event) => {
    setSelectedPokemon(event.target.value);
  };

  const handleFindPokemon = async () => {
    await dispatch(getPokemonByName(selectedPokemon));

    if (
      pokemonFound &&
      pokemonFound.pokeId &&
      pokemonFound.pokeId.toString().length <= 3
    ) {
      setRedirect(true);
    }
  };
  if (redirect && pokemonFound.pokeId) {
    return <Redirect to={`/pokemons/${pokemonFound.pokeId}`} />;
  }

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

        <select
          value={selectedPokemon}
          onChange={handleSelectPokemon}
          className={styles.box}
        >
          <option value="">--Pokemon Name.. --</option>
          {menu.map((pokemon) => (
            <option value={pokemon.pokeId}>{pokemon}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchPokemon;
