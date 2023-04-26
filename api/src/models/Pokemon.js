const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const Pokemon = sequelize.define(
    "pokemon",
    {
      pokeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 20],
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
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
