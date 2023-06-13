const jwt = require("jsonwebtoken");

exports.sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
//check ว่า token นี้มี secret keyไหม หมายถึงว่าเช็คว่าเหมือนเป็นสมาชิกเป็นยูสเซอร์ของเว็บเราจริงไหม
exports.verify = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);
