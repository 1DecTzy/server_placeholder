const express = require('express');
const Auth = require('../model/authModel')
const Material = require('../model/materialModel')
const router = express.Router();
var cors = require('cors');
const checkAuth = require('../middleware/check-auth');
var csv = require('csv-express');
router.use(cors());
router.get('/profile/user',checkAuth,async (req, res) => {
  const {email} = req.body
  try {
    const data = await Auth.findOne(email)
      .populate({ path: 'material_id' });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
})
router.get('/user/:id', async (req, res) => {
  const _id = req.params.id
  const user = await Auth.findById({ _id }).populate('material_id')
  res.json(user)
})
router.get('/csv', async(req,res)=>{
  const items = await Material.find()
  res.json(items)
})
module.exports = router;