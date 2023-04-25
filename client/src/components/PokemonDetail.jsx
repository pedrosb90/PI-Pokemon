import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPokemonById } from "../actions/index";
import styles from "../styles/pokeDetail.module.css";
import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const pokeDetail = useSelector((state) => state.pokeDetail);
  const { pokeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonById(pokeId));
  }, [dispatch, pokeId]);

  try {
    if (!pokeDetail) {
      return <div>Loading...</div>;
    }
    // const capiTitle =
    //   pokeDetail &&
    //   pokeDetail.name.slice(0, 1).toUpperCase() + pokeDetail.name.slice(1);

    return (
      <div>
        <h1 className={`${styles.titleMain}`}>Pokemon Detail</h1>{" "}
        <div className={`${styles.content} ${styles.container}`}>
          <h2
            className={`${styles.title}`}
            style={{ textTransform: "capitalize" }}
          >
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
  } catch (error) {
    console.error(error);
    return (
      <div>
        <h1>Oops! Something went wrong.</h1>
      </div>
    );
  }
};

export default PokemonDetail;
