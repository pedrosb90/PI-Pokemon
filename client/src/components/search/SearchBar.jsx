import React from "react";
import OriginFilter from "./OriginFilter";
import SortOptions from "./SortOptions";
import SearchPokemon from "./SearchPokemon";
import styles from "../../styles/accesories/searchBar.module.css";
import TypesFilter from "./TypesFilter";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <SearchPokemon />
      <OriginFilter />
      {/* <TypesFilter /> */}
      <SortOptions />
    </div>
  );
};
export default SearchBar;
