import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPokemonById } from "../actions/index";
import styles from "../styles/pokeDetail.module.css";
import bgStyle from "../styles/bg.module.css";

import errorMess from "../styles/accesories/error.module.css";
import loader from "../styles/loader.module.css";
import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const pokeDetail = useSelector((state) => state.pokeDetail);
  const error = useSelector((state) => state.error);

  const [isLoading, setIsLoading] = useState(false);

  const { pokeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getPokemonById(pokeId)).then(setIsLoading(false));
  }, [dispatch, pokeId]);

  if (isLoading) {
    return <h2 className={loader.loading}>Loading...</h2>;
  }

  return (
    <div className={bgStyle.bg}>
      <h1 className={`${styles.titleMain}`}>Pokemon Detail</h1>{" "}
      <div className={`${styles.content} ${styles.container}`}>
        <h2
          className={`${styles.title}`}
          style={{ textTransform: "capitalize" }}
        >
          {error && (
            <div className="error">
              <p className={errorMess.message}>{error} </p>
            </div>
          )}
          {pokeDetail?.name}
        </h2>
        <img
          src={pokeDetail.image}
          alt={pokeDetail.name}
          className={styles.image}
        />
        <p className={styles.iD}>ID: {pokeDetail.pokeId}</p>
        <p>Life: {pokeDetail.life}</p>
        <p>Attack: {pokeDetail.attack}</p>
        <p>Defense: {pokeDetail.defense}</p>
        <p>Speed: {pokeDetail.speed}</p>
        <p>Height: {(pokeDetail.height * 0.1).toFixed(1)} Meters</p>
        <p>Weight: {pokeDetail.weight / 10} Kg.</p>
        <p className={styles.typesContainer}>
          Types:{" "}
          {pokeDetail && pokeDetail.types && pokeDetail.types.length > 0
            ? pokeDetail.types
                .map(
                  (type) =>
                    type.name.slice(0, 1).toUpperCase() + type.name.slice(1)
                )
                .join(", ")
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default PokemonDetail;
