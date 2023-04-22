import React from "react";
import { useDispatch } from "react-redux";
import { sortPokemonsAZ, sortPokemonsByAttack } from "../../actions";
import styles from "../../styles/accesories/searchBar.module.css";

function SortOptions() {
  const dispatch = useDispatch();

  const handleSortAZ = (order) => {
    dispatch(sortPokemonsAZ(order));
  };

  const handleSortByAttack = (order) => {
    dispatch(sortPokemonsByAttack(order));
  };

  return (
    <div>
      <button
        type="sort"
        className={styles.button}
        onClick={() => handleSortAZ("asc")}
      >
        {" "}
        Sort Alphabetically (A-Z)
      </button>
      <br />
      <button
        type="sort"
        className={styles.button}
        onClick={() => handleSortByAttack("desc")}
      >
        Sort by Attack Force (high to low)
      </button>
    </div>
  );
}

export default SortOptions;
