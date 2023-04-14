import React from "react";
import { Link } from "react-router-dom";
import HomeButton from "./buttons/HomeButton";

const Landing = () => {
  return (
    <div>
      <h1>Henry Pokemon</h1>
      <Link to="/home">
        <HomeButton>Home</HomeButton>
      </Link>
    </div>
  );
};
export default Landing;
