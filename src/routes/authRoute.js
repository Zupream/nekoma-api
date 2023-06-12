const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateMiddleware = require("../middlewares/authenticate");

router.get("/getMe", authenticateMiddleware, authController.getMe);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
