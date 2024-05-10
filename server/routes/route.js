const express = require("express");
const htmlToPDF = require("../controllers/htmlToPDF");
const fileHandleMiddleware = require("../middleware/fileMiddleware");

const router = express.Router();

router.post("/upload", fileHandleMiddleware.single("html"), htmlToPDF);

module.exports = router;
