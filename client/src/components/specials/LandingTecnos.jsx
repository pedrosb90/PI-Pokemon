import React from "react";
import logoReact from "../../img/react.png";
import logoRedux from "../../img/redux.png";
import logoNode from "../../img/nodejs.png";
import logoExpress from "../../img/express.png";
import styles from "../../styles/accesories/tecnos.module.css";

function LandingTecnos() {
  return (
    <>
      <div className="footer">
        <div className={styles.container}>
          <img src={logoNode} className={styles.image} alt="logo" />
          <img
            src={logoExpress}
            className={styles.image}
            alt="logo"
            width={20}
          />
          <img src={logoReact} className={styles.image} alt="logo" />
          <img src={logoRedux} className={styles.image} alt="logo" />
        </div>
      </div>
    </>
  );
}
export default LandingTecnos;
