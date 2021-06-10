const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "cart",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      items: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
    },
    {
      freezeTableName: true,
    },
    { timestamps: false }
  );
};
