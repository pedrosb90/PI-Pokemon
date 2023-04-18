import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPokemons, getPokemonById } from "../actions/index";
import styles3 from "../styles/cards.module.css";
import styles4 from "../styles/accesories/buttons.module.css";
import DetailLink from "./buttons/DetailLink";
import Pagination from "./specials/Pagination";

const DisplayPokemons = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const max = pokemons.length / perPage;

  console.log(max);

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div className={`${styles3.container}`}>
      {pokemons
        .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
        .map(({ pokeId, name, image, types }) => (
          <div className={`${styles3.card} ${styles3.content}`} key={pokeId}>
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
        ))}
      <br />

      <Pagination
        page={page}
        setPage={setPage}
        max={max}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: "10px",
          backgroundColor: "#fff",
        }}
      />
    </div>
  );
};

export default DisplayPokemons;
