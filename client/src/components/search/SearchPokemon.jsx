import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonByName } from "../../actions";
import styles from "../../styles/accesories/searchBar.module.css";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
          <option key="option" value="">
            --Pokemon Name.. --
          </option>
          {menu.map((pokemon) => {
            return (
              <option key={uuidv4()} value={pokemon.pokeId}>
                {pokemon}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
export default SearchPokemon;
