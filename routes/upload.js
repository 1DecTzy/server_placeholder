const express = require('express');
const router = express.Router();
var cors = require('cors');
const multer  = require('multer')
router.use(cors());
const userController = require('../controller/userController')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      const filename =   file.fieldname + '-' + Date.now() + '.jpg';
      req.body.filepath= filename;
      cb(null, filename)
    }
  })
const uploadfile = multer({ storage: storage })
router.post('/profile/upload',uploadfile.single('image'), userController.upload)
module.exports = router;