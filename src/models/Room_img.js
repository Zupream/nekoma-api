module.exports = (sequelize, DataTypes) => {
  //   const { Sequelize, DataTypes } = require("sequelize");
  //   const sequelize = new Sequelize();

  const RoomImg = sequelize.define(
    "RoomImg",
    {
      urlImg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  RoomImg.associate = (db) => {
    RoomImg.belongsTo(db.Room, {
      foreignkey: "roomId",
      onDelete: "Cascade",
      onUpdate: "Cascade",
    });
  };
  return RoomImg;
};
