const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "location",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      lng: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
    },

    {
      freezeTableName: true,
    },
    { timestamps: false }
  );
};
