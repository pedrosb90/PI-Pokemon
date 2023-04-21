import React from "react";
function FoundPokemon() {
  return (
    <div className={`${styles3.container}`}>
      <PokemonCard
        pokeId={found.pokeId}
        name={found.name}
        image={found.image}
        types={found.types}
      />
    </div>
  );
}

export default FoundPokemon;
