const multer = require("multer");

const storage = multer.memoryStorage(); // Keep file in memory, not disk
const upload = multer({ storage });

module.exports = upload;
