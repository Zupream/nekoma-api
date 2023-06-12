const createErorr = require("../utils/createError");
const userService = require("../services/userService");
const bcryptService = require("../services/bcryptService");
const tokenService = require("../services/tokenService");

exports.getMe = (req, res, next) => {
  res.json({ user: req.user });

  res.json({ msg: "test getMe" });
};
exports.register = async (req, res, next) => {
  try {
    // 1.รับข้อมูล email password confirmPassword
    const { firstName, lastName, tel, email, password, confirmPassword } =
      req.body;
    // 2.เช็ค input มีหรือเปล่า
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !tel
    ) {
      return createErorr("input is invalid", 400);
    }
    // 3.เช็ค type ของ input ว่าเป็น string มั้ย
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof tel !== "string"
    ) {
      return createErorr("Password is invalid", 400);
    }

    // 4. เช็คความยาว password
    if (password.length < 8 || password.length > 16) {
      return createErorr("Password out of lenght", 400);
    }
    // 5.เช็ค passowrd ตรงกับ confirmPassword?
    if (password !== confirmPassword) {
      return createErorr("Password not match", 400);
    }
    // 6. เช็ค email ซ้ำใน DB
    const isUserExist = await userService.getUserByEmail(email);

    if (isUserExist) {
      return createErorr("User exist", 400);
    }
    // 7. hash password
    const hashedPassword = await bcryptService.hash(password);

    // 8. create ข้อมูลใน DB
    const value = {
      firstName,
      lastName,
      tel,
      email,
      password: hashedPassword,
    };

    const newUser = await userService.createUser(value);

    // 9. สร้าง token
    const payload = { id: newUser.id };
    const accessToken = tokenService.sign(payload);
    // 10. ส่ง token ออกไปใน response
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
  // res.json({ msg: "test regis" });
};
// ****************************************************

exports.login = async (req, res, next) => {
  // เช็คว่าได้กรอกอีเมลและพาวเวิดไหม
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return createErorr("Email or Password is avaliable", 400);
    }

    // เช็คว่าอีเมลและพาสเวิดเป็นสตริงไหม
    if (typeof email !== "string" || typeof password !== "string") {
      return createErorr("Email or Password is invalid", 400);
    }

    // เช็ตว่าพาสเวิร์ดถูกไหม

    const user = await userService.getUserByEmail(email);

    const isPasswordValid = await bcryptService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return createErorr("Email or Password is invalid", 400);
    }

    // เช็คว่ามีอีเมลอยู่ในดาต้าเบสไหม (เป็นสมาชิกหรือยัง)
    // const isUserExist = await userService.getUserByEmail(email);

    if (!user) {
      return createErorr("User not exist", 400);
    }

    // สร้าง token
    const payload = { id: user.id };
    const accessToken = tokenService.sign(payload);
    //  ส่ง token ออกไปใน response
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
  // res.json({ msg: "test login" });
};

// router.get("/getMe");
// router.post("/register");
// router.post("/login");
