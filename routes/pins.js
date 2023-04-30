const express = require('express');
const router = express.Router();
var cors = require('cors');
const {Pin} = require('../model/pinsModel')
const multer  = require('multer')
router.use(cors());
const folder = './public/plans'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folder)
    },
    filename: function (req, file, cb) {
      const filename = Date.now() +  file.originalname;
      req.body.images = filename;
      cb(null, filename)
    }
  })
const upload = multer({ storage: storage })
//Plan
router.post('/pins/post',upload.single('images'), async(req,res)=>{
    const {owner_id,images,name} = req.body
    const url = 'https://api-placeholder.onrender.com/public/'
    const img = url + images
    const Pins = {
        owner_id,
        images:img,
        name
    }
    const Location = new Pin(Pins)
    Location.save()
    res.json(Location)
})
router.get('/pins/get/:owner_id',async(req,res)=>{
  const owner_id = req.params.owner_id
  const Plans = await Pin.find({owner_id})
  res.json(Plans)
})
router.get('/pins/gets/:id',async(req,res)=>{
try{
const _id = req.params.id
const Plans = await Pin.findById({_id})
res.json(Plans)}catch(e){
  console.log(e)
}
})
router.put('/pins/put/:id',async(req,res)=>{
try {
  const _id = req.params.id
  const {owner_id,images,name} = req.body
  const Plans = {
    owner_id,
    images,
    name,
  }
  await Pin.findByIdAndUpdate({ _id }, Plans)
  const update = await Pin.findById({ _id });
  res.json(update);
} catch (e) {
  console.log(e)
}
})
router.delete('/pins/delete/:id',async(req,res)=>{
  const _id = req.params.id
  await Pin.findByIdAndDelete({_id})
  res.json({message:"deleted"})
})

module.exports = router;
