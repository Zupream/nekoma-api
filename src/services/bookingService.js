// const {Room} = require('../models')

// exports.getRoomById = (roomId) => Room.findOne({
//     where:{
//         id: roomId
//     }
// })
const { Booking } = require("../models");
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
      id: userId,
    },
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
  });
