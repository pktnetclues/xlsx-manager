const express = require("express");
const importXlsx = require("../controllers/importXlsx");

const multer = require("multer");
const exportXlsx = require("../controllers/exportXlsx");
const getXlsx = require("../controllers/getXlsx");
const deleteXlsxData = require("../controllers/deleteXlsxData");
const fileHandleMiddleware = require("../middleware/fileMiddleware");

const router = express.Router();

router.post("/upload", fileHandleMiddleware.single("xlsx"), importXlsx);
router.get("/get", getXlsx);
router.get("/download", exportXlsx);
router.delete("/delete", deleteXlsxData);

module.exports = router;
