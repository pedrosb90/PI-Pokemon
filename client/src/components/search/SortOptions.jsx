import React, { useSelector, useState } from "react";
import { useDispatch } from "react-redux";
import { sortPokemonsAZ, sortPokemonsByAttack } from "../../actions";
import styles from "../../styles/accesories/searchBar.module.css";

function SortOptions() {
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortAZ = (order) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";

    dispatch(sortPokemonsAZ(newOrder));
    setSortOrder(newOrder);
  };

  const handleSortByAttack = (order) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";

    dispatch(sortPokemonsByAttack(newOrder));
    setSortOrder(newOrder);
  };

  return (
    <div>
      <button
        type="sort"
        className={styles.button}
        onClick={() => handleSortAZ("asc")}
      >
        {`Sort Alphabetically ${sortOrder === "asc" ? "A-Z" : "Z-A"}`}
      </button>
      <br />
      <button
        type="sort"
        className={styles.button}
        onClick={() => handleSortByAttack("desc")}
      >
        {`Sort by Attack ${
          sortOrder === "asc" ? "(low to high)" : "(high to low)"
        }`}
      </button>
    </div>
  );
}

export default SortOptions;
