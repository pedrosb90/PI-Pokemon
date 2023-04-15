const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  const Type = sequelize.define("type", {
    typeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      initialAutoIncrement: 1,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  Type.associate = (models) => {
    Type.belongsToMany(models.Pokemon, {
      through: "PokemonType",
      foreignKey: "typeId",
      otherKey: "pokeId",
    });
  };
  return Type;
};
