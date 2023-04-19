import React from "react";
import styles from "../../styles/accesories/searchBar.module.css";

function SortOptions() {
  return (
    <div>
      <button type="sort" className={styles.button}>
        {" "}
        Sort Alphabetically
      </button>
      <br />
      <button type="sort" className={styles.button}>
        Sort by Attack Force
      </button>
    </div>
  );
}

export default SortOptions;
