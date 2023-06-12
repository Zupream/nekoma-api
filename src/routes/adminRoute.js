const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const upload = require("../middlewares/upload");

// ****ดึงหน้ารายการที่รอการตรวจสอบ หลังจากล้อคอินด้วยadmin)
router.get("/booking/all", adminController.getAllBooking);

// *****กดยืนยัน approve/reject
router.patch(
  "/status/:bookingId/:bookingStatus",
  adminController.updateStatusBooking
);

// **หน้าEditRoom
// ดึงข้อมูลห้องทั้งหมด OK
router.get("/allRoom", adminController.getAllRoom);
// กดเพิ่มห้อง OK
router.post("/add", adminController.createRoom);
// กดลบห้อง ok
router.delete("/delete/:roomId", adminController.deleteRoom);
// กดแอดรูปรายละเอียดห้อง
router.patch(
  "/room/:roomId/imagesDetail",
  upload.array("images", 10),
  adminController.updateImgDetail
);
// กดแอดรูปปกห้อง
router.patch(
  "/room/:roomId/imagesCover",
  upload.single("image"),
  adminController.updateImgCover
);
// กดแอดรูปไทป์ห้อง ok
router.patch(
  "/room/:roomId/imagesType",
  upload.single("image"),
  adminController.updateImgType
);
// กดอัพเดตรายละเอียดและราคาห้อง (บันทึก) OK
router.patch("/room/:roomId", adminController.updateRoomDetail);
// ดึงข้อมูลห้องเวลาจะกดอัพเดต ok
router.get("/room/:roomId", adminController.getRoomId);
// ลบรูปในรายละเอียดรูปห้อง
router.delete("/room/image/:imageId", adminController.deleteImgRoom);

module.exports = router;
