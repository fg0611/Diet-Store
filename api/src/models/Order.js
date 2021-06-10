const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderState: {
        type: DataTypes.ENUM("processing", "cancelled", "completed"),
        allowNull: true,
      },
      shippingState: {
        type: DataTypes.ENUM(
          "initial",
          "created",
          "processing",
          "cancelled",
          "completed"
        ),
        allowNull: true,
      },
      purchasePrice: {
        type: DataTypes.FLOAT,
      },
    },

    {
      freezeTableName: true,
    },
    { timestamps: false }
  );
};
