const multer = require("multer");
const path = require("path");

// Set storage
const storage = multer.diskStorage({
  destination: `./uploads/`,
  filename: function (req, file, cb) {
    const fileName = path.basename(file.originalname);
    const filename = `${Date.now()}-${fileName}`;
    cb(null, filename);
  },
});

const fileHandleMiddleware = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

// Export the fileHandleMiddleware
module.exports = fileHandleMiddleware;
