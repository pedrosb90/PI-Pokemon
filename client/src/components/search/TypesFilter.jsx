import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByType, getTypes } from "../../actions";
import styles from "../../styles/accesories/searchBar.module.css";

function TypesFilter() {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState("");
  const types = useSelector((state) => state.types);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTypes() {
      await dispatch(getTypes());
      setIsLoading(false);
    }
    fetchTypes();
  }, [dispatch]);

  const handleFilterByType = () => {
    if (selectedType) {
      dispatch(filterByType(selectedType));
    }
  };

  const handleSelectType = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div>
      <button className={styles.button} onClick={handleFilterByType}>
        Filter
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <select
          className={styles.box}
          onChange={handleSelectType}
          value={selectedType}
        >
          <option value="">--Select Pokemon Type--</option>
          {types.map((type) => (
            <option key={type.typeId} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default TypesFilter;
