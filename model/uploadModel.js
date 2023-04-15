const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UploadSchme = mongoose.Schema({
   uploader: {
      type: String,
   },
   title: {
      type: String,
   },
   view: {
      type: Number,
      default: 0
   },   filepath:{
      data: Buffer,
      contentType: String,
   }
}, { timestamp: true })
module.exports = mongoose.model('Uplaod', UploadSchme)