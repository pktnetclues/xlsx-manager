const express = require("express");
const importXlsx = require("../controllers/importXlsx");

const multer = require("multer");
const exportXlsx = require("../controllers/exportXlsx");
const getXlsx = require("../controllers/getXlsx");

const router = express.Router();

router.post("/upload", multer({ dest: "uploads/" }).single("xlsx"), importXlsx);
router.get("/get", getXlsx);
router.get("/download", exportXlsx);

module.exports = router;
