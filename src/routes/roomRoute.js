const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.get("/all", roomController.getAllRooms);
router.get("/detail/:roomId", roomController.getRoomDetail);

module.exports = router;
