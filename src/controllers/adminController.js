const adminService = require("../services/adminService");
const { checkString, checkNumber } = require("../utils/validate");
const createError = require("../utils/createError");
const uplodeService = require("../services/uploadService");
const bookingService = require("../services/bookingService");
const fs = require("fs");

exports.getAllBooking = async (req, res, next) => {
  const allBooking = await adminService.getAllBooking();
  res.json({ allBooking });
};

exports.updateStatusBooking = async (req, res, next) => {
  const { bookingStatus, bookingId } = req.params;

  const value = {
    paymentStatus:
      bookingStatus !== "REJECT" && bookingStatus !== "CONFIRM"
        ? undefined
        : bookingStatus,
  };

  console.log(bookingStatus);
  const booking = await adminService.updateBooking(value, bookingId);

  res.json({ booking });
};
// ดึงข้อมูลทุกห้องในหน้าแก้ไข
exports.getAllRoom = async (req, res, next) => {
  try {
    const allRoom = await adminService.getAllRooms();
    res.json({ allRoom });
  } catch (error) {
    next(error);
  }
};
// เพิ่มห้อง
exports.createRoom = async (req, res, next) => {
  try {
    const createRoom = await adminService.createRoom();
    res.json({ room: createRoom });
  } catch (error) {
    next(error);
  }
};
// ลบห้อง
exports.deleteRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const deleteRoom = await adminService.deleteRoom(roomId);
    res.json({ deleteRoom });
  } catch (error) {
    next(error);
  }
};
// อัพเดตรูปห้อง
exports.updateImgDetail = async (req, res, next) => {
  try {
    if (req.files.length > 0) {
      const files = req.files;

      const urlArray = [];
      const { roomId } = req.params;

      for (let image of files) {
        const urlObj = await uplodeService.upload(image.path);
        urlArray.push(urlObj.secure_url);
      }

      const values = urlArray.map((el) => {
        return {
          urlImg: el,
          roomId,
        };
      });

      const images = await adminService.createRoomImages(values);

      return res.json({ images });
    }

    res.json({ msg: "not uploaded" });
  } catch (error) {
    next(error);
  } finally {
    for (let image of req.files) {
      if (image) {
        fs.unlinkSync(image.path);
      }
    }
  }
};
// อัพเดตรูปปกห้อง
exports.updateImgCover = async (req, res, next) => {
  try {
    if (req.file) {
      const imgCoverUrl = await uplodeService.upload(req.file.path);
      const value = {
        coverUrl: imgCoverUrl.secure_url,
      };
      const { roomId } = req.params;
      const updatedImgCover = await adminService.updateRoomById(roomId, value);
      return res.json({ updatedImgCover });
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
// อัพเดตรูปไทป์ห้อง
exports.updateImgType = async (req, res, next) => {
  try {
    if (req.file) {
      const imgTypeUrl = await uplodeService.upload(req.file.path);
      // console.log(imgTypeUrl);
      const value = {
        typeRoomUrl: imgTypeUrl.secure_url,
      };
      const { roomId } = req.params;

      const updatedImgType = await adminService.updateRoomById(roomId, value);
      return res.json({ updatedImgType });
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
// อัพเดตรายละเอียดห้อง
exports.updateRoomDetail = async (req, res, next) => {
  const { typeRoom, maxPet, price, roomDetail } = req.body;

  const { roomId } = req.params;

  console.log({ roomId });

  const value = {
    typeRoom: checkString(typeRoom),
    maxPet: checkNumber(maxPet),
    price: checkNumber(price),
    roomDetail: checkString(roomDetail),
  };

  const updatedRoom = await adminService.updateRoomById(roomId, value);

  res.json({ updatedRoom });
};

// ดีงข้อมูลรายห้องเพื่อจะกดอัพเดต
exports.getRoomId = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return createError("room is invalid", 400);
    }
    const roomById = await adminService.getRoombyId(roomId);

    res.json({ room: roomById });
  } catch (error) {
    next(error);
  }
};
// ลบรูปรายละเอียดห้อง
exports.deleteImgRoom = async (req, res, next) => {
  const { imageId } = req.params;

  if (!imageId) {
    return createError("image id to be provided");
  }

  await adminService.deleteImgDetail(imageId);
  res.json({ msg: "Deleted successfully" });
};
