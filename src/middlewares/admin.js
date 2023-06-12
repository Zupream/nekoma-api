const createError = require("../utils/createError");

module.exports = async (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      return createError("Forbidden", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};
