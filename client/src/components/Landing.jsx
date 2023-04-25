import React from "react";
import styles from "../styles/bodyText.module.css";
import image from "/Users/pedro/Desktop/Henry/P INDIVIDUALES/PI-Pokemon-main/client/src/pokeLogo.png";
import styles1 from "../styles/landing.module.css";
import LandingTecnos from "../components/specials/LandingTecnos";

const Landing = () => {
  return (
    <div className={`${styles.container}`}>
      <br />
      <h1 className={`${styles.title}`}>Welcome to Henry Pokemons App!</h1>
      <div>
        <img src={image} className={`${styles1.img}`} alt="decoimg" />
      </div>
      <LandingTecnos />
    </div>
  );
};
export default Landing;
