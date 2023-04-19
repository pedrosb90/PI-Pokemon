import React from "react";
import { Link } from "react-router-dom";
import TypesButton from "./buttons/TypesButton";
import DisplayPokemons from "./DisplayPokemons";
import styles from "../styles/home.module.css";
import SearchBar from "./search/SearchBar";
import CreateButton from "./buttons/CreateButton";

const Home = () => {
  return (
    <div>
      <h1 className={styles.title}>Pokemons</h1>
      <Link to="/types">
        <TypesButton />
      </Link>
      <Link to="/createpokemons">
        <CreateButton />
      </Link>
      <SearchBar />
      <br />
      <DisplayPokemons />
    </div>
  );
};
export default Home;
