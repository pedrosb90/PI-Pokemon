import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTypes, getTypes } from "../../actions/index";

const FormTypeSelect = ({ setPokemon }) => {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

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
    }
  };

  const handleRemoveType = (typeId) => {
    setSelectedTypes(selectedTypes.filter((t) => t !== typeId));
    setPokemon((prevState) => ({
      ...prevState,
      typeIds: prevState.typeIds.filter((id) => id !== typeId),
    }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Select types"
        value={selectedTypes.map((t) => t.name).join(", ")}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <ul>
          {types.map((type) => (
            <li key={type.typeId} onClick={() => handleTypeClick(type)}>
              {type.name}
            </li>
          ))}
        </ul>
      )}
      <div>
        {selectedTypes.map((type) => (
          <span key={type.typeId}>
            {type.name}
            <button onClick={() => handleRemoveType(type)}>x</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FormTypeSelect;
