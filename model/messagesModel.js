const mongoose = require('mongoose');
const MessagesSchme = mongoose.Schema({
    owner_id: {
        type: String,
        ref: 'Auth'
    },
    friend_id:{
        type: String,
        ref: 'Auth'
    },
    message:{
        type: String,
        required: true
    }
}, { timestamp: true })
module.exports = mongoose.model('Messages', MessagesSchme)