const { response } = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://etecproject:etec1234@cluster0.nj2hvoa.mongodb.net/etec?retryWrites=true&w=majority').then((response)=>{
    console.log('connect db success');
}).catch((e)=>{
    console.log(e)
})

module.exports = mongoose;
