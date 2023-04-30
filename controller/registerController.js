const Auth = require('../model/authModel');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const registerController = {
    register: async (req, res) => {
        const {email, password, conpassword,avatar} = req.body;
        const salts = await bcrypt.genSalt();
        const hashedPass = bcrypt.hashSync(password, salts, function (_err, hash) {
            console.log(hash);
        });
        const hashedcoPass = bcrypt.hashSync(conpassword, salts, function (_err, hash) {
            console.log(hash);
        });
        const url = 'https://api-placeholder.onrender.com/public/'
        const useravatar = url + avatar 
        try {
            const existingUser = await Auth.findOne({ email });
            const User = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dob: req.body.dob,
                email: req.body.email,
                password: hashedPass,
                conpassword: hashedcoPass,
                avatar: useravatar,
                material_id: new mongoose.Types.ObjectId()
            }
            if (!existingUser) {
                if (User.password != User.conpassword) {
                    return res.sendStatus(400);
                }
                if (!email || !password) {
                    return res.status(422).send({ message: "Missing email or password." });
                }
                const user = new Auth(User);
                user.save();
                res.json(user);
            } else return res.status(409).send({
                message: "Email is already in use."
            });
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }
}

module.exports = registerController