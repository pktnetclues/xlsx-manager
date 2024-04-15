const express = require("express");
const sequelize = require("./Utils/sequelize");
const cors = require("cors");
const dotenv = require("dotenv");

const router = require("./routes/route");

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api", router);

sequelize;

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
