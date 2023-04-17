import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTypes, getTypes } from "../../actions/index";
import styles from "../../styles/form.module.css";

const FormTypeSelect = ({ setPokemon }) => {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeClick = (typeId) => {
    if (!selectedTypes.includes(typeId)) {
      setSelectedTypes([...selectedTypes, typeId]);
      setPokemon((prevState) => ({
        ...prevState,
        typeIds: [...prevState.typeIds, typeId],
      }));
      setError("");
    }
  };

  const handleRemoveType = (typeId) => {
    setSelectedTypes(selectedTypes.filter((t) => t !== typeId));
    setPokemon((prevState) => ({
      ...prevState,
      typeIds: prevState.typeIds.filter((id) => id !== typeId),
    }));
  };
  const validateTypes = () => {
    if (selectedTypes.length === 0) {
      setError("Please select at least one type");
      return false;
    }
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateTypes();
    if (isValid) {
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Select types"
        value={selectedTypes
          .map((t) => t.name.charAt(0).toUpperCase() + t.name.slice(1))
          .join(", ")}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <ul className={`${styles.typeList}`}>
          {types.map((type) => (
            <li key={type.typeId} onClick={() => handleTypeClick(type)}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </li>
          ))}
        </ul>
      )}
      <div className={`${styles.chosenTypes}`}>
        {selectedTypes.map((type) => (
          <span key={type.typeId}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}

            <button
              className={`${styles.clearTypeButton}`}
              onClick={() => handleRemoveType(type)}
            >
              {""}x{""}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FormTypeSelect;
