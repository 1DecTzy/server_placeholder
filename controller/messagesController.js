const Messages = require('../model/messagesModel')

const messagesController={
    chat: async(req,res)=>{
        const {owner_id,friend_id,message} = req.body
        const messages ={
            owner_id,
            friend_id,
            message
        }
        const newmessages = new Messages(messages)
        newmessages.save();
        res.json(newmessages)
    },
    get: async(req,res)=>{
        const sms = await Messages.find().populate({path:'owner_id'}).populate({path:'friend_id'})
        res.json(sms)
    }
}
module.exports = messagesController