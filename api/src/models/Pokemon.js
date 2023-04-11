const { DataTypes, Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  const Pokemon = sequelize.define("pokemon", {
    pokeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Pokemon.associate = (models) => {
    Pokemon.belongsToMany(models.Type, {
      through: "PokemonType",
      foreignKey: "pokemonId",
      otherKey: "typeId",
    });
  };
  return Pokemon;
};
