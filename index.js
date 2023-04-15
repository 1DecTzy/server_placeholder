const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require("morgan");
const path = require ("path")
const Auth = require('./model/authModel');
const cors = require('cors');
const port = process.env.PORT || 8000
const corsOrigin = 'http://localhost:3000'
require('./db/authdb');
dotenv.config();
const app = express();
const userRouter = require('./routes/user');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login')
const videoRouter = require('./routes/video')
const uploadRouter = require('./routes/upload');
const materialRouter = require('./routes/material')
const messagesRouter = require('./routes/message')
const pinRouter= require('./routes/pins')
const pinimgRouter = require('./routes/pinimg')
app.use(morgan("tiny"));
app.use(express.static('index.js'));
app.use(express.json());
app.use(express.static(path.join(__dirname +'./upload')))
app.use(express.static(path.join(__dirname +'./public/avatar')))
app.use(express.static(path.join(__dirname +'./public/plans')))
app.use('',loginRouter)
app.use('',registerRouter)
app.use('/api',userRouter);
app.use('/api',videoRouter)
app.use('/api',uploadRouter)
app.use('/api',materialRouter)
app.use('/api',messagesRouter)
app.use('/api',pinRouter)
app.use('/api',pinimgRouter)
app.use(express.static('./public/avatar'))
app.use(express.static('./public/plans'))
app.use(express.static('./public/plans/pins'))
app.use('/public',express.static('./public/avatar'))
app.use('/public',express.static('./public/plans'))
app.use('/public',express.static('./public/plans/pins'))
// app.use(express.static('./public/material'))
app.use('/public',express.static('./public/material'))
app.use(cors())
app.use(cors({
    origin:[corsOrigin],
    methods:['GET','POST'],
    credentials:true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, function () {
    console.log('server port is ' + port);
})