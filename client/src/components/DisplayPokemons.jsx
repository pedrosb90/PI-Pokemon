import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPokemons } from "../actions/index";
import PokemonCard from "./PokemonCard";
import styles3 from "../styles/cards.module.css";
import errorMess from "../styles/accesories/error.module.css";
import Pagination from "./specials/Pagination";
import loader from "../styles/loader.module.css";

const DisplayPokemons = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const filteredPokemons = useSelector((state) => state.filtered);
  const error = useSelector((state) => state.error);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(true);

  const max = Math.ceil(
    filteredPokemons.length > 0
      ? filteredPokemons.length / perPage
      : pokemons.length / perPage
  );
  const lastPageItems =
    (filteredPokemons.length > 0 ? filteredPokemons.length : pokemons.length) %
    perPage;

  useEffect(() => {
    setIsLoading(true);
    try {
      dispatch(getAllPokemons()).then(setIsLoading(false));
    } catch (error) {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [filteredPokemons]);

  if (isLoading) {
    return <h2 className={loader.loading}>Loading...</h2>;
  }

  return (
    <div className={`${styles3.container}`}>
      {error && (
        <div className="error">
          <p className={errorMess.message}>{error}</p>
        </div>
      )}
      {(filteredPokemons.length > 0 ? filteredPokemons : pokemons)
        .slice(
          (page - 1) * perPage,
          page === max ? (page - 1) * perPage + lastPageItems : page * perPage
        )
        .map(({ pokeId, name, image, types, uuid }) => (
          <PokemonCard
            key={uuid}
            pokeId={pokeId}
            name={name}
            image={image}
            types={types}
          />
        ))}
      <br />
      <div className={styles3.pagination}>
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
    </div>
  );
};

export default DisplayPokemons;
