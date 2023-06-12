// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      typeRoom: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      maxPet: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      roomDetail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coverUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typeRoomUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );
  Room.associate = (db) => {
    Room.hasMany(db.Booking, {
      foreignkey: {
        name: "roomId",
        allowNull: false,
      },
      onDelete: "Cascade",
      onUpdate: "Cascade",
    });

    Room.hasMany(db.RoomImg, {
      foreignkey: {
        name: "roomId",
        allowNull: false,
      },
      onDelete: "Cascade",
      onUpdate: "Cascade",
    });
  };

  return Room;
};
