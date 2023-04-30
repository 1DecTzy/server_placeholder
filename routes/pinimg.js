const express = require('express');
const router = express.Router();
var cors = require('cors');
const { Pinimg } = require('../model/pinsModel')
const multer = require('multer')
router.use(cors());
const folder = './public/plans/pins'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folder)
  },
  filename: function (req, file, cb) {
    const filename = file.originalname;
    req.body.pin_images = filename;
    cb(null, filename)
  }
})
const upload = multer({ storage: storage })
//Pin
router.post('/pin/post', upload.single('pin_images'), async (req, res) => {
  try {
    const { pin_id, pin_images, text, x, y } = req.body
    const url = 'https://api-placeholder.onrender.com/public/'
    const img = url + pin_images
    const Pins = {
      pin_id,
      pin_images: img,
      text,
      x,
      y
    }
    const Location = new Pinimg(Pins)
    Location.save()
    res.json(Location)
  } catch (e) {
    console.log(e)
  }
})
router.get('/pin/get/:pin_id', async (req, res) => {
  const pin_id = req.params.pin_id
  const Pin = await Pinimg.find({ pin_id }).populate({ path: 'pin_id', select: "images" })
  res.json(Pin)
})
router.get('/pin/get/one/:id', async (req, res) => {
  const _id = req.params.id
  const onePin = await Pinimg.findById({ _id })
  res.json(onePin)
})
router.delete('/pin/delete/one/:id', async (req, res) => {
  try {
    const _id = req.params.id
    await Pinimg.findByIdAndDelete({ _id })
    res.json({ Deleted })
  } catch (e) {
    console.log(e)
  }
})
module.exports = router;