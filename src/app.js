require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");
const authRoute = require("./routes/authRoute");
const roomRoute = require("./routes/roomRoute");
const bookingRoute = require("./routes/bookingRoute");
const adminRoute = require("./routes/adminRoute");
const { sequelize } = require("./models");
const authenticateMiddleware = require("./middlewares/authenticate");
const adminMiddleware = require("./middlewares/admin");
// sequelize.sync({ alter: true });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/room", roomRoute);
app.use("/booking", bookingRoute);
app.use("/admin", authenticateMiddleware, adminMiddleware, adminRoute);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT;
app.listen(port, () => console.log("server is running on port", port));
