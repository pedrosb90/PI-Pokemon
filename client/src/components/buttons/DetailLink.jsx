import React from "react";
import styles from "../../styles/accesories/buttons.module.css";

function DetailLink(props) {
  return (
    <div>
      {" "}
      <button className={`${styles.buttonDetails} `}>Details</button>
    </div>
  );
}

export default DetailLink;
