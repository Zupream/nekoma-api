// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize();

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      tel: {
        type: DataTypes.STRING,
        validate: {
          is: /^[0-9]{10}$/,
        },
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  User.associate = (db) => {
    User.hasMany(db.Booking, {
      foreignkey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "Cascade",
      onUpdate: "Cascade",
    });
  };
  return User;
};
