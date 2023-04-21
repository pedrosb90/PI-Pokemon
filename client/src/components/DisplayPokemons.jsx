import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPokemons } from "../actions/index";
import PokemonCard from "./PokemonCard";
import styles3 from "../styles/cards.module.css";
import Pagination from "./specials/Pagination";

const DisplayPokemons = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const filteredPokemons = useSelector((state) => state.filtered);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const max = pokemons.length / perPage;

  console.log(max);

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div className={`${styles3.container}`}>
      {(filteredPokemons.length > 0 ? filteredPokemons : pokemons)
        .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
        .map(({ pokeId, name, image, types }) => (
          <PokemonCard
            key={pokeId}
            pokeId={pokeId}
            name={name}
            image={image}
            types={types}
          />
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
