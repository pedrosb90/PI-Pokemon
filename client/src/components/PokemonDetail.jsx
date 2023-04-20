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
  }, [pokeId]);

  try {
    if (!pokeDetail) {
      return <div>Loading...</div>;
    }
    const capiTitle =
      pokeDetail.name.charAt(0).toUpperCase() + pokeDetail.name.slice(1);

    return (
      <div>
        <h1 className={`${styles.titleMain}`}>Pokemon Detail</h1>{" "}
        <div className={`${styles.content} ${styles.container}`}>
          <h2 className={` ${styles.title}`}>{capiTitle}</h2>
          <img
            src={pokeDetail.image}
            alt={pokeDetail.name}
            className={styles.image}
          />
          <p>ID: {pokeDetail.pokeId}</p>
          <p>Life: {pokeDetail.life}</p>
          <p>Attack: {pokeDetail.attack}</p>
          <p>Defense: {pokeDetail.defense}</p>
          <p>Speed: {pokeDetail.speed}</p>
          <p>Height: {pokeDetail.height}</p>
          <p>Weight: {pokeDetail.weight}</p>
          <p>
            Types:{" "}
            {pokeDetail.types
              .map(
                (type) => type.name.charAt(0).toUpperCase() + type.name.slice(1)
              )
              .join(", ")}
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
