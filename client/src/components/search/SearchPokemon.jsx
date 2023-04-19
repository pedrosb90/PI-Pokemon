import React from "react";
import styles from "../../styles/accesories/searchBar.module.css";
function SearchPokemon() {
  return (
    <div>
      <button type="find" className={styles.button}>
        Find
      </button>
      <button type="reset" className={styles.button}>
        Reset
      </button>
      <select type="search" className={styles.box}>
        {" "}
        <option>--Pokemon Name.. --</option>
      </select>
    </div>
  );
}

export default SearchPokemon;
