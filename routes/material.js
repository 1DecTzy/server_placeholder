const express = require('express');
const Auth = require('../model/authModel')
const router = express.Router();
var cors = require('cors');
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const materialController = require('../controller/materialController');
const folder = './public/material'
const Material = require('../model/materialModel')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folder)
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + file.originalname;
    req.body.images = filename;
    cb(null, filename)
  }
})
const upload = multer({ storage: storage })
router.use(cors());
router.post('/material', upload.single('images'), materialController.material)
router.get('/items', async (req, res) => {
  const items = await Material.find().populate('user_id')
  res.json(items)
})
router.get('/item/:id', async (req, res) => {
  const _id = req.params.id
  const items = await Material.findById({_id})
  res.json(items)
})
router.get('/items/:user_id', async (req, res) => {
  const user_id = req.params.user_id
  const items = await Material.find({user_id})
  res.json(items)
})
router.delete('/items/delete/:id', async (req, res) => {
  try {
    const _id = req.params.id
    await Material.findByIdAndRemove({ _id })
    res.json({ message: "User id " + _id + " deleted" })
  } catch (e) {
    console.log(e)
  }
})
router.put('/items/update/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const {name,amount,scale,images,user_id,more,used} = req.body;
    const namount = amount+(-used+more)
    const Materials = {
      name,
      amount: namount,
      scale,
      images,
      user_id
    }
    await Material.findByIdAndUpdate({ _id }, Materials)
    const update = await Material.findById({ _id });
    res.json(update);
  } catch (e) {
    console.log(e)
  }
})
module.exports = router;