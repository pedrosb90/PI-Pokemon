import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokemonById } from "../actions";
import styles from "../styles/cards.module.css";
import DetailLink from "../components/buttons/DetailLink";

function PokemonCard({ pokeId, name, image, types }) {
  const dispatch = useDispatch();

  return (
    <div className={`${styles.card} ${styles.content}`} key={pokeId}>
      <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      <img src={image} alt={name} />
      <div>
        <h2>Types: </h2>
        {types.map(({ slot, name }) => (
          <p key={slot}>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
        ))}
        <Link
          to={`/pokemons/${pokeId}`}
          onClick={() => dispatch(getPokemonById(pokeId))}
        >
          <DetailLink />
        </Link>
      </div>
    </div>
  );
}

export default PokemonCard;
