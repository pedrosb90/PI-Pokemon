import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPokemon } from "../actions";
import FormTypeSelect from "./specials/FormTypeSelect";
import styles from "../styles/form.module.css";

function CreatePokemons() {
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

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setPokemon({
      ...pokemon,
      [name]: value,
    });
  }
  function validateInput(value) {
    if (!value) {
      return "Please fill in this field";
    }
    if (isNaN(value)) {
      return "Please enter a number";
    }
    if (value <= 0) {
      return "Please enter a positive number";
    }
    if (value > 999) {
      return "Please enter a 3 digit number";
    }
    return "";
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = document.getElementById("form");
    const inputs = form.querySelectorAll("input");
    let formIsValid = true;
    inputs.forEach((input) => {
      const validationMessage = validateInput(input.value);
      if (validationMessage) {
        input.setCustomValidity(validationMessage);
        formIsValid = false;
      } else {
        input.setCustomValidity("");
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
        />

        <label className={`${styles.labelTitle}`}>Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={pokemon.image}
          onChange={handleChange}
        />

        <label className={`${styles.labelTitle}`}>Life:</label>
        <input
          type="number"
          id="life"
          name="life"
          value={pokemon.life}
          onChange={handleChange}
          className={
            validateInput(pokemon.life) ? styles.invalid : styles.valid
          }
        />
        {validateInput(pokemon.life) && (
          <label className={styles.errorMessage}>
            {validateInput(pokemon.life)}
          </label>
        )}

        <label className={`${styles.labelTitle}`}>Attack:</label>
        <input
          type="number"
          id="attack"
          name="attack"
          value={pokemon.attack}
          onChange={handleChange}
        />

        <label className={`${styles.labelTitle}`}>Defense:</label>
        <input
          type="number"
          id="defense"
          name="defense"
          value={pokemon.defense}
          onChange={handleChange}
        />

        <label className={`${styles.labelTitle}`}>Speed:</label>
        <input
          type="number"
          id="speed"
          name="speed"
          value={pokemon.speed}
          onChange={handleChange}
        />

        <label className={`${styles.labelTitle}`}>Height:</label>
        <input
          type="number"
          id="height"
          name="height"
          value={pokemon.height}
          onChange={handleChange}
        />

        <label className={`${styles.labelTitle}`}>Weight:</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={pokemon.weight}
          onChange={handleChange}
        />

        <label className={`${styles.labelTitle}`}>Types:</label>
        <FormTypeSelect setPokemon={setPokemon} />
        <br />
        <button type="submit" className={`${styles.submitButton}`}>
          Create Pokemon
        </button>
      </form>
    </div>
  );
}

export default CreatePokemons;
