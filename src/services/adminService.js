const { Room, RoomImg, Booking } = require("../models");

exports.getAllRooms = () => Room.findAll();

exports.createRoom = () => Room.create();

exports.updateRoomById = (roomId, value) =>
  Room.update(value, {
    where: {
      id: roomId,
    },
  });

exports.getRoombyId = (roomId) =>
  Room.findOne({
    where: {
      id: roomId,
    },
  });

exports.deleteRoom = (roomId) =>
  Room.destroy({
    where: {
      id: roomId,
    },
  });

exports.createRoomImages = (values) => RoomImg.bulkCreate(values);

exports.getAllBooking = () => Booking.findAll();
exports.updateBooking = (value, bookingId) =>
  Booking.update(value, {
    where: {
      id: bookingId,
    },
  });
