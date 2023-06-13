const createError = require("../utils/createError");
const roomService = require("../services/roomService");
const { checkTime, checkString, checkNumber } = require("../utils/validate");
const { ADD_ON } = require("../config/constant");
const bookingService = require("../services/bookingService");
const uploadService = require("../services/uploadService");
const fs = require("fs");

exports.createBooking = async (req, res, next) => {
  try {
    const { roomId, checkIn, checkOut, petNumber } = req.body;
    if (!roomId || !checkIn || !checkOut || !petNumber) {
      return createError("Input is invalid", 400);
    }
    const room = await roomService.getRoomDetail(roomId);
    if (!room) {
      return createError("Input is invalid", 400);
    }

    const checkInObj = checkTime(checkIn);
    const checkOutObj = checkTime(checkOut);

    if (!checkInObj || !checkOutObj) {
      return createError("Invalid format", 400);
    }

    if (checkOutObj < checkInObj) {
      return createError("Checkout must be later than CheckIn", 400);
    }

    const petAmount = checkNumber(petNumber);
    if (!petAmount) {
      return createError("Input is invalid", 400);
    }
    const totalDay = checkOutObj - checkInObj;
    const millisecondInDay = 24 * 60 * 60 * 1000;
    const differenceInDay = Math.ceil(totalDay / millisecondInDay);

    let exceedingPet = 0;

    if (petAmount - room.maxPet > 0) {
      exceedingPet = petAmount - room.maxPet;
    }

    const totalPrice =
      room.price * differenceInDay + exceedingPet * ADD_ON * differenceInDay;

    const { id } = req.user;
    const value = {
      checkIn,
      checkOut,
      amountPet: petNumber,
      totalPrice,
      totalDay: differenceInDay,
      acceptedCondition: true,
      userId: id,
      roomId,
      paymentStatus: "PENDING",
    };
    const newBooking = await bookingService.createBooking(value);
    res.json({ booking: newBooking });
  } catch (error) {
    next(error);
  }
};

exports.getBookingDetail = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const booking = await bookingService.getBookingById(bookingId);
    if (!booking) {
      return createError("not booking", 400);
    }

    if (booking.userId !== req.user.id) {
      return createError("Unauthorize this booking", 400);
    }

    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

exports.updateSlip = async (req, res, next) => {
  try {
    if (req.file) {
      const slipObj = await uploadService.upload(req.file.path);

      const { specialRequest } = req.body;

      const value = {
        paymentSlip: slipObj.secure_url,
        specialRequest: checkString(specialRequest),
      };
      const { bookingId } = req.params;

      const booking = await bookingService.getBookingById(bookingId);
      // bookingนี้ useridนี้เป็นเจ้าของหรือเปล่า
      if (booking.userId !== req.user.id) {
        return createError("Unauthorize this booking", 400);
      }

      const updatedBooking = await bookingService.updateBooking(
        bookingId,
        value
      );
      return res.json({ updatedBooking });
    }

    res.json({ msg: "No file uploaded" });
  } catch (error) {
    next(error);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const booking = await bookingService.getBookingById(bookingId);

    if (!booking) {
      return createError("Booking not exist", 400);
    }

    if (booking.userId !== req.user.id) {
      return createError("Unauthorize this booking", 400);
    }
    await bookingService.deleteMyBooking(bookingId);

    res.json({ msg: "Delete success" });
  } catch (error) {
    next(error);
  }
};

exports.getMyBooking = async (req, res, next) => {
  try {
    const { id } = req.user;
    const myBooking = await bookingService.getAllMyBooking(id);
    res.json({ myBooking });
  } catch (error) {
    next(error);
  }
};
