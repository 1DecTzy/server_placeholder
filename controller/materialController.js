const materials = require('../model/materialModel');
const mongoose = require('mongoose');
const materialController = {
    material: async(req,res) =>{ 
        const {name,amount,scale,images,user_id} = req.body;
        const url = 'https://api-placeholder-server.onrender.com/public/'
        const material = url + images
        try{
            const Materials = {
                images:material,
                name,
                amount,
                scale,
                user_id  
            }
            const Item = new materials(Materials);
            Item.save();
            res.json(Item);
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = materialController