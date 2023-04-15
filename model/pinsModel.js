const mongoose = require('mongoose');
const PinSchme = mongoose.Schema({
    owner_id: {
        type: String,
        ref: 'Auth'
    },
    images: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    created_at:
    {
        type: Date,
        required: true,
        default: Date.now()
    }
}, { timestamp: true })
const PinimageSchema = mongoose.Schema({
    pin_id:{
        type: String,
        ref: 'Pin'
    },
    pin_images: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
    x: {
        type: Number,
        default: -10
    },
    y: {
        type: Number,
        default: -10
    },
})
const Pin = mongoose.model('Pin', PinSchme)
const Pinimg = mongoose.model('Pinimg',PinimageSchema)
module.exports = {Pin,Pinimg}