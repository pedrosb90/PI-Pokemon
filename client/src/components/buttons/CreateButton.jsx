import React from "react";
import styles from "../../styles/accesories/buttons.module.css";

function CreateButton() {
  return (
    <div>
      <button className={styles.buttonOption}>Create Pokemon</button>
    </div>
  );
}

export default CreateButton;
