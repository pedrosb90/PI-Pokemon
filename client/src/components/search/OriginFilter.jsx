import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemonsOrigin } from "../../actions";
import styles from "../../styles/accesories/searchBar.module.css";

function OriginFilter() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  const [originFilter, setOriginFilter] = useState("");

  const handleFilterByOrigin = (origin) => {
    if (origin === "") {
      dispatch(filterPokemonsOrigin([]));
      setOriginFilter("");
      return;
    }

    const filtered = pokemons.filter((pokemon) => pokemon.origin === origin);
    dispatch(filterPokemonsOrigin(filtered));
    setOriginFilter(origin);
  };
  const handleFilterClick = () => {
    let filtered = pokemons;
    if (originFilter === "api") {
      filtered = pokemons.filter((pokemon) => pokemon.origin === "api");
    } else if (originFilter === "created") {
      filtered = pokemons.filter((pokemon) => pokemon.origin === undefined);
    }
    dispatch(filterPokemonsOrigin(filtered));
  };
  return (
    <div>
      <div>
        <button className={styles.button} onClick={handleFilterClick}>
          {" "}
          Filter
        </button>
        <select
          className={styles.box}
          onChange={(e) => handleFilterByOrigin(e.target.value)}
          value={originFilter}
        >
          <option value="">--Select Origin--</option>
          <option value="api">API</option>
          <option value="created">New Creations</option>
        </select>{" "}
      </div>
    </div>
  );
}

export default OriginFilter;
