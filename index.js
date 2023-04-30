const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require("morgan");
const path = require ("path")
const cors = require('cors');
const server = express
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
app.use(express.static(path.join(__dirname +'./public')))
app.use(loginRouter)
app.use(registerRouter)
app.use(userRouter);
app.use(videoRouter)
app.use(uploadRouter)
app.use(materialRouter)
app.use(messagesRouter)
app.use(pinRouter)
app.use(pinimgRouter)
app.use('/public',express.static('public'))
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
