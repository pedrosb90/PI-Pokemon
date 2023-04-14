import React from "react";
import { Link } from "react-router-dom";
import TypesButton from "./buttons/TypesButton";
import DisplayPokemons from "./DisplayPokemons";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/types">
        <TypesButton>Types Button</TypesButton>
      </Link>
      <DisplayPokemons />
    </div>
  );
};
export default Home;
