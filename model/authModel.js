const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const AuthSchme = mongoose.Schema({
    firstname: {
        type: String,
        default: 'First Name'
    },
    lastname: {
        type: String,
        default: 'Last Name'
    },
    dob: {
        type: String,
    },
    email: {
        type: String,
        required: ["Please provide an Email!"],
        unique: [true, "Email Exist"],
    },
    password: {
        type: String,
    },
    conpassword: {
        type: String,
    },
    avatar: {
        type: String,
        default: '',
    },
    material_id:[{
        type: Schema.Types.ObjectId,
        ref:'materials'
    }],
}, { timestamp: true })

// AuthSchme.virtual('booksPublished', {
//     ref: 'materials', //The Model to use
//     localField: '_id', //Find in Model, where localField 
//     foreignField: 'authdata', // is equal to foreignField
//  });

// AuthSchme.set('toObject', { virtuals: true });
// AuthSchme.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Auth', AuthSchme)