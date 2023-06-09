import React from "react";
import styles from "../../styles/accesories/buttons.module.css";

function HomeButton(props) {
  return (
    <div>
      {" "}
      <button className={`${styles.buttonHome} ${props.className}`}>
        {props.children}
      </button>
    </div>
  );
}

export default HomeButton;
