const { Room } = require("../models");

exports.getAllRooms = () => Room.findAll();
