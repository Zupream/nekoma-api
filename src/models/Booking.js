// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      checkIn: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      amountPet: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      specialRequest: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalDay: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        default: "PENDING",
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      paymentSlip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      acceptedCondition: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
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
  Booking.associate = (db) => {
    Booking.belongsTo(db.User, {
      foreignkey: "userId",
      onDelete: "Cascade",
      onUpdate: "Cascade",
    }),
      Booking.belongsTo(db.Room, {
        foreignkey: "roomId",
        onDelete: "Cascade",
        onUpdate: "Cascade",
      });
  };

  return Booking;
};
