const mongoose = require('mongoose');
const Schema = mongoose.Schema
const MaterialSchme = mongoose.Schema({
    images: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        default: 0
    },
    scale:{
        type: String,
        default: ''
    },
    more:{
        type: Number,
        default: 0
    },
    used:{
        type: Number,
        default: 0
    },
    user_id: {
        type: String,
        ref: 'Auth'
    },
}, { timestamp: true })
module.exports = mongoose.model('materials', MaterialSchme)