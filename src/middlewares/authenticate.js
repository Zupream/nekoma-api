const createError = require("../utils/createError");
const tokenService = require("../services/tokenService");
const userService = require("../services/userService");
module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("unauthorize", 401);
    }
    // เช็คว่ามีtoken ติดมาหลัง bearer ด้วยไหม
    const token = authorization.split(" ")[1];
    if (!token) {
      createError("unauthorized", 401);
    }
    // เช็คว่า token นี้เป็นของเว็บเราหรือเปล่า
    const payload = tokenService.verify(token);
    // เช็คว่ามีuserไหม
    const user = await userService.getUserById(payload.id);
    if (!user) {
      createError("unauthorized", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
