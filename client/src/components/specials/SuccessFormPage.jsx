import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/accesories/successForm.module.css";
import CreateButton from "../buttons/CreateButton";
function SuccessPage() {
  return (
    <div className={styles.div}>
      <Link to="/createpokemons">
        <CreateButton>Go to Activities</CreateButton>
      </Link>
      <h2 className={styles.h2}>Thank you for your submission!</h2>
      <p>Your Pokemon has been created successfully.</p>
    </div>
  );
}

export default SuccessPage;
