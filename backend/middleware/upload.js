const multer = require("multer");

<<<<<<< HEAD
const storage = multer.memoryStorage();
=======
<<<<<<< HEAD
const storage = multer.memoryStorage();
=======
const storage = multer.memoryStorage(); // Keep file in memory, not disk
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
const upload = multer({ storage });

module.exports = upload;
