import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemonsOrigin } from "../../actions";
import styles from "../../styles/accesories/searchBar.module.css";

function OriginFilter() {
  const dispatch = useDispatch();
  const [originFilter, setOriginFilter] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilterClick = () => {
    if (originFilter === "") {
      dispatch(filterPokemonsOrigin([]));
      setIsFiltered(true);
    } else {
      setIsFiltered(true);
      dispatch(filterPokemonsOrigin(originFilter));
    }
  };

  const handleReset = () => {
    setIsFiltered(false);
    setOriginFilter("");
    dispatch(filterPokemonsOrigin([]));
  };

  return (
    <div>
      <div>
        <button
          className={styles.button}
          onClick={isFiltered ? handleReset : handleFilterClick}
        >
          {isFiltered ? "Reset" : "Filter"}
        </button>
        <select
          className={styles.box}
          onChange={(e) => setOriginFilter(e.target.value)}
          value={originFilter}
        >
          <option value="">-- Pokemon Origin --</option>
          <option value="api">API</option>
          <option value="created">New Creations</option>
        </select>{" "}
      </div>
    </div>
  );
}

export default OriginFilter;
