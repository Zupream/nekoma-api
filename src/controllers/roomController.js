const roomService = require("../services/roomService");
const createErorr = require("../utils/createError");

exports.getAllRooms = async (req, res, next) => {
  try {
    const { checkIn, checkOut, petNumber } = req.query;

    if (!checkIn && !checkOut && !petNumber) {
      const rooms = await roomService.getAllRooms();
      return res.json({ rooms });
    }

    if (!checkIn || !checkOut || !petNumber) {
      return createErorr("input is invalid", 400);
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // console.log(checkInDate - checkOutDate);
    if (checkOutDate < checkInDate) {
      return createErorr("Date is invalid", 400);
    }

    const availableSearchedRooms = await roomService.getSearchRooms(
      checkIn,
      checkOut,
      petNumber
    );

    res.json({ rooms: availableSearchedRooms });
  } catch (error) {
    next(error);
  }
};

exports.getRoomDetail = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return createErorr("room is invalid", 400);
    }

    const roomDetail = await roomService.getRoomDetail(roomId);
    if (!roomDetail) {
      return createErorr("Not found Room", 400);
    }

    res.json({ roomDetail });
  } catch (error) {
    next(error);
  }
};
