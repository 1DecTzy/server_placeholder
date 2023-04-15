const express = require('express');
const router = express.Router();
const cors = require('cors');
const multer  = require('multer')
const registerController = require('../controller/registerController');
router.use(cors());
const folder = './public/avatar'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folder)
    },
    filename: function (req, file, cb) {
      const filename = Date.now()+file.originalname
      req.body.avatar= filename;
      cb(null, filename)
    }
  })
const uploadavatar = multer({ storage: storage })
router.post("/register", uploadavatar.single('avatar'),registerController.register)
module.exports = router;