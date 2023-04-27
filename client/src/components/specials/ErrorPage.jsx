import React, { useState } from "react";
import styles from "../../styles/accesories/errorPage.module.css";

function ErrorPage() {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className={styles.container}>
      <h1 className={styles.message}>{errorMessage}</h1>
    </div>
  );
}

export default ErrorPage;
