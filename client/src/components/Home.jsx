import React from "react";
import { Link } from "react-router-dom";
import TypesButton from "./buttons/TypesButton";
import DisplayPokemons from "./DisplayPokemons";
import styles from "../styles/home.module.css";
import SearchBar from "./search/SearchBar";
import CreateButton from "./buttons/CreateButton";
import titleImg from "/Users/pedro/Desktop/Henry/P INDIVIDUALES/PI-Pokemon-main/client/src/pokeLogo.png";

const Home = () => {
  return (
    <div>
      <img src={titleImg} alt="titleImage" className={styles.img}></img>
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
