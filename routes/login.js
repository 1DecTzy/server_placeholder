const express = require('express');
const Auth = require('../model/authModel')
const Uplaod = require('../model/uploadModel');
const router = express.Router();
var cors = require('cors');
var bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const { material } = require('../controller/materialController');
router.use(cors());
router.post("/login", async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await Auth.findOne({ email }).populate({ path: 'material_id' });;
        console.log(user);
        if (user) {
          const cmp = await bcrypt.compare(password , user.password);
          if (cmp) {
            const token = jwt.sign(
                {
                  userId: user._id,
                  userEmail: user.email,
                },
                process.env.TOKEN,
                { expiresIn: '1h' }
              );
            res.status(200).send({
                id: user._id,
                avatar: user.avatar,
                username: [
                  user.firstname,
                  user.lastname,
                ],
                token,
              });
          } else {
            res.send("Wrong password.");
          }
        } else {
          res.send("Wrong username ");
        }
      } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server error Occured");
      }
})
module.exports = router;