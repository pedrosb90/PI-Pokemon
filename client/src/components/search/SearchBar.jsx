import React from "react";
import FilterOptions from "./FilterOptions";
import SortOptions from "./SortOptions";
import SearchPokemon from "./SearchPokemon";
import styles from "../../styles/accesories/searchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <SearchPokemon />
      <FilterOptions />
      <SortOptions />
    </div>
  );
};
export default SearchBar;
