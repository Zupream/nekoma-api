const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// ****ดึงหน้ารายการที่รอการตรวจสอบ หลังจากล้อคอินด้วยadmin)
router.get("/booking/all", adminController.getAllBooking);

// *****กดยืนยัน approve/reject
router.patch(
  "/status/:bookingId/:bookingStatus",
  adminController.updateStatusBooking
);

// **หน้าEditRoom
// ดึงข้อมูลห้องทั้งหมด
router.get("/allRoom", adminController.getAllRoom);
// กดเพิ่มห้อง
router.post("/add", adminController.createRoom);
// กดลบห้อง
router.delete("/delete/:roomId", adminController.deleteRoom);
// กดแอดรูปรายละเอียดห้อง
router.patch("/room/:roomId/imagesDetail", adminController.updateImgDetail);
// กดแอดรูปปกห้อง
router.patch("/room/:roomId/imagesCover", adminController.updateImgCover);
// กดแอดรูปไทป์ห้อง
router.patch("/room/:roomId/imagesType", adminController.updateImgType);
// กดอัพเดตรายละเอียดและราคาห้อง (บันทึก)
router.patch("/room/:roomId", adminController.updateRoomDetail);
// ดึงข้อมูลห้องเวลาจะกดอัพเดต
router.get("/room/:id", adminController.getRoomId);
// ลบรูปในรายละเอียดรูปห้อง
router.delete("/room/image/:imageId", adminController.deleteImgRoom);

module.exports = router;
