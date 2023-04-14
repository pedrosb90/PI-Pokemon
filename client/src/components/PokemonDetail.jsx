import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPokemonById } from "../actions/index";
import styles from "../styles/bodyText.module.css";
import styles2 from "../styles/infoText.module.css";

const PokemonDetail = ({ pokeId }) => {
  const pokeDetail = useSelector((state) => state.pokeDetail);

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
        <h1 className={`${styles.title}`}>Pokemon Detail</h1>
        <div className={`${styles2.content}`}>
          {" "}
          <h2>{capiTitle}</h2>
          <p>ID: {pokeDetail.pokeId}</p>
          <img src={pokeDetail.image} alt={pokeDetail.name} />
          <p>Life: {pokeDetail.life}</p>
          <p>Attack: {pokeDetail.attack}</p>
          <p>Defense: {pokeDetail.defense}</p>
          <p>Speed: {pokeDetail.speed}</p>
          <p>Height: {pokeDetail.height}</p>
          <p>Weight: {pokeDetail.weight}</p>
          <p>Types: {pokeDetail.types.map((type) => type.name).join(", ")}</p>
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
