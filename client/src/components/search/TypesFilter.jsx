import React from "react";
import styles from "../../styles/accesories/searchBar.module.css";

function TypesFilter() {
  return (
    <div>
      {/* {" "}
      <select
        className={styles.box}
        onChange={(e) => handleFilterByType(e.target.value)}
      >
        <option value="">--Select Pokemon Type--</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select> */}
    </div>
  );
}

export default TypesFilter;
