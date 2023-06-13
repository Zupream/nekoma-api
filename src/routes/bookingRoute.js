const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const upload = require("../middlewares/upload");

router.post("/", bookingController.createBooking);
router.get("/detail/:bookingId", bookingController.getBookingDetail);
router.patch(
  "/slip/:bookingId",
  upload.single("image"),
  bookingController.updateSlip
);
router.delete("/:bookingId", bookingController.deleteBooking);

router.get("/myBooking", bookingController.getMyBooking);

module.exports = router;
