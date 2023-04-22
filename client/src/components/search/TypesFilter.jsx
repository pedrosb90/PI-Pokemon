import React, { useSelector, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterByType, getTypes } from "../../actions";
import styles from "../../styles/accesories/searchBar.module.css";

function TypesFilter() {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState("");

  const types = [
    { name: "bug" },

    { name: "poison", typeId: "1" },

    { name: "normal", typeId: "2" },

    { name: "flying", typeId: "3" },

    { name: "grass", typeId: "4" },

    { name: "electric", typeId: "5" },

    { name: "fire", typeId: "6" },

    { name: "water", typeId: "7" },

    { name: "ice", typeId: "8" },

    { name: "steel", typeId: "9" },

    { name: "rock", typeId: "10" },

    { name: "ground", typeId: "11" },

    { name: "fighting", typeId: "12" },

    { name: "ghost", typeId: "13" },

    { name: "psychic", typeId: "14" },

    { name: "fairy", typeId: "15" },
  ];

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
      <button className={styles.button} onClick={() => handleFilterByType("")}>
        {" "}
        Filter
      </button>
      <select className={styles.box} onChange={handleSelectType}>
        <option value="">--Select Pokemon Type--</option>
        {types.map((type) => (
          <option key={type.typeId} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default TypesFilter;
