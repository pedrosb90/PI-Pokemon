import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPokemon } from "../actions";
import {
  validateHeightInput,
  validateWeiInput,
  validateImageUrl,
  validateTextInput,
  validateNumInput,
} from "../components/specials/formValidations";
import FormTypeSelect from "./specials/FormTypeSelect";
import styles from "../styles/form.module.css";

function CreatePokemons() {
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    {
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
      {isSubmitted ? (
        <div>
          <Redirect to="/success-page" />
        </div>
      ) : (
        <div>
          {" "}
          <div className={`${styles.containerTitle}`}>
            <h1 className={`${styles.title}`}>Create your own Pokemon!</h1>
          </div>
          <form
            novalidate
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
              className={validateTextInput(pokemon.name)}
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
              onChange={handleChange}
              placeholder="Only valid image format: .png, .jpg, .jpeg, or .gif URLs"
              className={validateImageUrl(pokemon.image)}
            />
            {validateImageUrl(pokemon.image) && (
              <label className={styles.errorMessage}>
                {validateImageUrl(pokemon.image, "Image")}
              </label>
            )}

            <label className={`${styles.labelTitle}`}>Life:</label>
            <input
              type="number"
              id="life"
              name="life"
              value={pokemon.life}
              onChange={handleChange}
              className={validateNumInput(pokemon.life)}
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
              className={validateNumInput(pokemon.attack)}
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
              className={validateNumInput(pokemon.defense)}
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
              className={validateNumInput(pokemon.speed)}
            />
            {validateNumInput(pokemon.speed) && (
              <label className={styles.errorMessage}>
                {validateNumInput(pokemon.speed, "Speed")}
              </label>
            )}
            <label className={`${styles.labelTitle}`}>
              {"Height (in Centimeters)"}
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={pokemon.height}
              onChange={handleChange}
              className={validateHeightInput(pokemon.height)}
            />
            {validateHeightInput(pokemon.height) && (
              <label className={styles.errorMessage}>
                {validateHeightInput(pokemon.height, "Height")}
              </label>
            )}
            <label className={`${styles.labelTitle}`}>
              {"Weight (in Grams) "}:
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={pokemon.weight}
              onChange={handleChange}
              className={validateWeiInput(pokemon.weight)}
            />
            {validateWeiInput(pokemon.weight) && (
              <label className={styles.errorMessage}>
                {validateWeiInput(pokemon.weight, "Weight")}
              </label>
            )}

            <label className={`${styles.labelTitle}`}>Types:</label>
            <FormTypeSelect
              setPokemon={setPokemon}
              handleSubmit={handleSubmit}
            />
            <br />
            <button
              type="submit"
              className={`${
                !pokemon.name ||
                !pokemon.image ||
                !pokemon.life ||
                !pokemon.attack ||
                !pokemon.defense ||
                !pokemon.speed ||
                !pokemon.height ||
                !pokemon.weight ||
                validateTextInput(pokemon.name) ||
                validateImageUrl(pokemon.image) ||
                validateNumInput(
                  pokemon.life,
                  pokemon.attack,
                  pokemon.speed,

                  pokemon.defense
                ) ||
                validateHeightInput(pokemon.height) ||
                validateWeiInput(pokemon.weight) !== null
                  ? styles.disabledButton
                  : styles.enabledButton
              }`}
              disabled={
                !pokemon.name ||
                !pokemon.image ||
                !pokemon.life ||
                !pokemon.attack ||
                !pokemon.defense ||
                !pokemon.speed ||
                !pokemon.height ||
                !pokemon.weight ||
                validateTextInput(pokemon.name, "Name") ||
                validateImageUrl(pokemon.image, "Image") ||
                validateNumInput(
                  pokemon.life,
                  pokemon.attack,
                  pokemon.speed,

                  pokemon.defense
                ) ||
                validateHeightInput(pokemon.height) ||
                validateWeiInput(pokemon.weight) !== null
              }
            >
              Create Pokemon
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreatePokemons;
