// const {Room} = require('../models')

// exports.getRoomById = (roomId) => Room.findOne({
//     where:{
//         id: roomId
//     }
// })
const { Booking, User, Room } = require("../models");
exports.createBooking = (value) => Booking.create(value);

exports.updateBooking = (bookingId, value) =>
  Booking.update(value, {
    where: {
      id: bookingId,
    },
  });

exports.getAllMyBooking = (userId) =>
  Booking.findAll({
    where: {
      userId,
    },
    include: [{ model: Room }],
  });

exports.deleteMyBooking = (bookingId) =>
  Booking.destroy({
    where: {
      id: bookingId,
    },
  });

exports.getBookingById = (bookingId) =>
  Booking.findOne({
    where: {
      id: bookingId,
    },
    include: [
      { model: User, attributes: { exclude: ["password"] } },
      { model: Room },
    ],
  });
