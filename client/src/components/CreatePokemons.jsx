import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPokemon } from "../actions";
import {
  validateNumInput,
  validateImageUrl,
  validateTextInput,
} from "../components/specials/formValidations";
import FormTypeSelect from "./specials/FormTypeSelect";
import styles from "../styles/form.module.css";
function CreatePokemons() {
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });
  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    typeIds: [],
  });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setPokemon({
      ...pokemon,
      [name]: value,
    });

    let errorMessage;
    if (name === "name") {
      errorMessage = validateTextInput(value, name);
    } else if (name === "image") {
      errorMessage = validateImageUrl(value);
    } else {
      errorMessage = validateNumInput(value, name);
    }

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = document.getElementById("form");
    const inputs = form.querySelectorAll("input");
    let formIsValid = true;

    inputs.forEach((input) => {
      const validationMessage =
        input.name === "name"
          ? validateTextInput(input.value, input.name)
          : input.name === "image"
          ? validateImageUrl(input.value)
          : validateNumInput(input.value, input.name);
      if (validationMessage) {
        input.setCustomValidity(validationMessage);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [input.name]: validationMessage,
        }));
        formIsValid = false;
      } else {
        input.setCustomValidity("");
        setErrors((prevErrors) => ({
          ...prevErrors,
          [input.name]: "",
        }));
      }
    });

    if (formIsValid) {
      const newPokemon = {
        ...pokemon,
        life: parseInt(pokemon.life),
        attack: parseInt(pokemon.attack),
        defense: parseInt(pokemon.defense),
        speed: parseInt(pokemon.speed),
        height: parseInt(pokemon.height),
        weight: parseInt(pokemon.weight),
        typeIds: pokemon.typeIds.map((type) => type.typeId.toString()),
      };
      console.log(pokemon.typeIds);
      dispatch(createPokemon(newPokemon));
      setPokemon({
        name: "",
        image: "",
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        typeIds: [],
      });
    }
  };

  return (
    <div>
      <div className={`${styles.containerTitle}`}>
        <h1 className={`${styles.title}`}>Create your own Pokemon!</h1>
      </div>

      <form
        id="form"
        className={`${styles.formDisplay} ${styles.container}`}
        onSubmit={handleSubmit}
      >
        <label className={`${styles.labelTitle}`}>Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={pokemon.name}
          onChange={handleChange}
          className={validateTextInput(pokemon.name) ? "invalid" : "valid"}
        />
        {validateTextInput(pokemon.name) && (
          <label className={styles.errorMessage}>
            {validateTextInput(pokemon.name, "Name")}
          </label>
        )}

        <label className={`${styles.labelTitle}`}>Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={pokemon.image}
          className={validateImageUrl(pokemon.image) ? "invalid" : "valid"}
        />
        {validateImageUrl(pokemon.image) && (
          <label className={styles.errorMessage}>
            {validateImageUrl(pokemon.name, "Image")}
          </label>
        )}

        <label className={`${styles.labelTitle}`}>Life:</label>
        <input
          type="number"
          id="life"
          name="life"
          value={pokemon.life}
          onChange={handleChange}
          className={`input-field ${
            validateNumInput(pokemon.life) ? "invalid" : "valid"
          }`}
        />
        {validateNumInput(pokemon.life) && (
          <label className={styles.errorMessage}>
            {validateNumInput(pokemon.life, "Life")}
          </label>
        )}

        <label className={`${styles.labelTitle}`}>Attack:</label>
        <input
          type="number"
          id="attack"
          name="attack"
          value={pokemon.attack}
          onChange={handleChange}
          className={validateNumInput(pokemon.attack) ? "invalid" : "valid"}
        />
        {validateNumInput(pokemon.attack) && (
          <label className={styles.errorMessage}>
            {validateNumInput(pokemon.attack, "Attack")}
          </label>
        )}
        <label className={`${styles.labelTitle}`}>Defense:</label>
        <input
          type="number"
          id="defense"
          name="defense"
          value={pokemon.defense}
          onChange={handleChange}
          className={validateNumInput(pokemon.defense) ? "invalid" : "valid"}
        />
        {validateNumInput(pokemon.defense) && (
          <label className={styles.errorMessage}>
            {validateNumInput(pokemon.defense, "Defense")}
          </label>
        )}
        <label className={`${styles.labelTitle}`}>Speed:</label>
        <input
          type="number"
          id="speed"
          name="speed"
          value={pokemon.speed}
          onChange={handleChange}
          className={validateNumInput(pokemon.speed) ? "invalid" : "valid"}
        />
        {validateNumInput(pokemon.speed) && (
          <label className={styles.errorMessage}>
            {validateNumInput(pokemon.speed, "Speed")}
          </label>
        )}
        <label className={`${styles.labelTitle}`}>Height:</label>
        <input
          type="number"
          id="height"
          name="height"
          value={pokemon.height}
          onChange={handleChange}
          className={validateNumInput(pokemon.height) ? "invalid" : "valid"}
        />
        {validateNumInput(pokemon.height) && (
          <label className={styles.errorMessage}>
            {validateNumInput(pokemon.height, "Height")}
          </label>
        )}
        <label className={`${styles.labelTitle}`}>Weight:</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={pokemon.weight}
          onChange={handleChange}
          className={validateNumInput(pokemon.weight) ? "invalid" : "valid"}
        />
        {validateNumInput(pokemon.weight) && (
          <label className={styles.errorMessage}>
            {validateNumInput(pokemon.weight, "Weight")}
          </label>
        )}

        <label className={`${styles.labelTitle}`}>Types:</label>
        <FormTypeSelect setPokemon={setPokemon} handleSubmit={handleSubmit} />
        <br />
        <button type="submit" className={`${styles.submitButton}`}>
          Create Pokemon
        </button>
      </form>
    </div>
  );
}

export default CreatePokemons;
