const multer = require("multer");

<<<<<<< HEAD
const storage = multer.memoryStorage();
=======
const storage = multer.memoryStorage(); // Keep file in memory, not disk
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad
const upload = multer({ storage });

module.exports = upload;
