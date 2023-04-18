import React from "react";
import SearchPokemon from "./child/SearchPokemon";
import FilterOptions from "./FilterOptions";
import SortOptions from "./SortOptions";
import styles from "../../styles/accesories/searchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <SearchPokemon />
      <h5>Filter: </h5>
      <FilterOptions />
      <h5>Sort: </h5>
      <SortOptions />
    </div>
  );
};
export default SearchBar;
