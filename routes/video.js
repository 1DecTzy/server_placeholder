const express = require('express');
const router = express.Router();
var cors = require('cors');
const Uplaod = require('../model/uploadModel')
router.use(cors());

router.get('/profile',async(req,res)=>{
    try{
    const video = await Uplaod.find()
    res.json(video)}catch(e){
        console.log(e)
    }
})

module.exports = router;