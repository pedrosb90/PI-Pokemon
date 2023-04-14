import React from "react";
import { Link } from "react-router-dom";
import HomeButton from "./buttons/HomeButton";

const Landing = () => {
  return (
    <div>
      <Link to="/home">
        <HomeButton>Home</HomeButton>
      </Link>
      <div>
        {" "}
        <h1>Welcome to Henry Pokemons App!</h1>
      </div>
    </div>
  );
};
export default Landing;
