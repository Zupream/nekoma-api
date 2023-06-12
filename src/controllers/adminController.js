const adminService = require("../services/adminService");

exports.getAllBooking = (req, res, next) => {
  res.json({ msg: "test getAllBooking" });
};
exports.updateStatusBooking = (req, res, next) => {
  res.json({ msg: "test updateStatusBooking" });
};

exports.getAllRoom = async (req, res, next) => {
  try {
    const allRoom = await adminService.getAllRooms();
    res.json({ allRoom });
  } catch (error) {
    next(error);
  }
};

exports.createRoom = (req, res, next) => {
  res.json({ msg: "test createRoom" });
};
exports.deleteRoom = (req, res, next) => {
  res.json({ msg: "test deleteRoom" });
};
exports.updateImgDetail = (req, res, next) => {
  res.json({ msg: "test updateImgDetail" });
};
exports.updateImgCover = (req, res, next) => {
  res.json({ msg: "test updateImgCover" });
};
exports.updateImgType = (req, res, next) => {
  res.json({ msg: "test updateImgType" });
};
exports.updateRoomDetail = (req, res, next) => {
  res.json({ msg: "test updateRoomDetail" });
};
exports.getRoomId = (req, res, next) => {
  res.json({ msg: "test getRoomId" });
};
exports.deleteImgRoom = (req, res, next) => {
  res.json({ msg: "test deleteImgRoom" });
};
