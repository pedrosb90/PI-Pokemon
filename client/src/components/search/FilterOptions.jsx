import React from "react";
import styles from "../../styles/accesories/searchBar.module.css";
function FilterOptions() {
  return (
    <div>
      <div>
        <button className={styles.button}> Filter</button>
        <select className={styles.box}>
          <option>--Select Origin--</option>
          <option value="api">API</option>
          <option value="created">New Creations</option>
        </select>{" "}
        <select className={styles.box}>
          //map type.name
          <option>--Select Pokemon Type--</option>
          <option value="type"></option>
        </select>
      </div>
    </div>
  );
}

export default FilterOptions;
