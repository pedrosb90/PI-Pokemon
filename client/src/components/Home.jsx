import React from "react";
import { Link } from "react-router-dom";
import TypesButton from "./buttons/TypesButton";
import DisplayPokemons from "./DisplayPokemons";
import styles from "../styles/bodyText.module.css";
import SearchBar from "./search/SearchBar";
import CreateLink from "./buttons/CreateLink";

const Home = () => {
  return (
    <div>
      <Link to="/types">
        <TypesButton />
      </Link>
      <Link to="/createpokemons">
        <CreateLink />
      </Link>
      <SearchBar />
      <DisplayPokemons />
    </div>
  );
};
export default Home;
