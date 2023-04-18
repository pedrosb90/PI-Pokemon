import React from "react";
import { Link } from "react-router-dom";
import TypesButton from "./buttons/TypesButton";
import DisplayPokemons from "./DisplayPokemons";
import styles from "../styles/bodyText.module.css";

const Home = () => {
  return (
    <div>
      <Link to="/types">
        <TypesButton />
      </Link>
      <h1 className={`${styles.title}`}>Home</h1>
      <DisplayPokemons />
    </div>
  );
};
export default Home;
