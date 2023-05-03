import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/accesories/successForm.module.css";
import errorMess from "../../styles/accesories/error.module.css";
import CreateButton from "../buttons/CreateButton";
import bgStyle from "../../styles/bg.module.css";

function SuccessPage() {
  const error = useSelector((state) => state.error);

  return (
    <div className={`${styles.div} ${bgStyle.bg}`}>
      <br />
      <br />
      <Link to="/createpokemons">
        <CreateButton>Go to Activities</CreateButton>
      </Link>
      {error ? (
        <div className="error">
          <p className={errorMess.message}>{error}</p>
        </div>
      ) : (
        <>
          <h2 className={`${styles.h2} ${styles.margins}`}>
            Thank you for your submission!
          </h2>
          <p>Your Pokemon has been created successfully.</p>
        </>
      )}
    </div>
  );
}

export default SuccessPage;
