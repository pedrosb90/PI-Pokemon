import React, { useSelector, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterByType, getTypes } from "../../actions";
import styles from "../../styles/accesories/searchBar.module.css";

function TypesFilter() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  console.log(types);
  const handleFilterByType = (type) => {
    dispatch(filterByType(type));
  };
  return (
    <div>
      <button className={styles.button} onClick={() => handleFilterByType("")}>
        {" "}
        Filter
      </button>
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
      </select>
    </div>
  );
}
export default TypesFilter;
