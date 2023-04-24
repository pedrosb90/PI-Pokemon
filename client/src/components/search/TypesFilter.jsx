import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByType, getTypes } from "../../actions";
import styles from "../../styles/accesories/searchBar.module.css";

function TypesFilter() {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState("");
  const types = useSelector((state) => state.types);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    async function fetchTypes() {
      await dispatch(getTypes());
      setIsLoading(false);
    }
    fetchTypes();
  }, [dispatch]);

  const handleReset = () => {
    setSelectedType("");
    setIsFiltered(false);
    dispatch(filterByType(""));
  };
  const handleFilterByType = () => {
    if (selectedType) {
      dispatch(filterByType(selectedType));
      setIsFiltered(true);
    }
  };

  const handleSelectType = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={isFiltered ? handleReset : handleFilterByType}
      >
        {isFiltered ? "Reset" : "Filter"}
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <select
          className={styles.box}
          onChange={handleSelectType}
          value={selectedType}
        >
          <option value="">-- Pokemon Type --</option>
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
