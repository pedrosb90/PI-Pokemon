const { DataTypes, Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  const Pokemon = sequelize.define(
    "pokemon",
    {
      pokeId: {
        type: DataTypes.INTEGER,
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
    },
    {
      hooks: {
        beforeCreate: async (pokemon) => {
          let pokeId;
          let attempts = 0;
          do {
            pokeId = Math.floor(Math.random() * 1000) + 1;
            attempts++;
            if (attempts > 1000) {
              throw new Error("Failed to generate a unique pokeId for Pokemon");
            }
          } while (await Pokemon.findOne({ where: { pokeId: pokeId } }));
          pokemon.pokeId = pokeId;
        },
      },
    }
  );

  Pokemon.associate = (models) => {
    Pokemon.belongsToMany(models.Type, {
      through: "PokemonType",
      foreignKey: "pokeId",
      otherKey: "typeId",
    });
  };

  return Pokemon;
};
