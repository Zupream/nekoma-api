const { User } = require("../models");

exports.getUserByEmail = (email) =>
  User.findOne({
    where: {
      email,
    },
  });

exports.createUser = (value) => {
  return User.create(value);
};

exports.getUserById = (id) =>
  User.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ["password"],
    },
  });
