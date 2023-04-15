const Uplaod = require('../model/uploadModel');
var fs = require('fs');
const userController = {
    upload: async (req, res) => {
        const {uploader, title, view } = req.body;
        try {
            const Upload = {
                uploader,
                title,            
                view,
                filepath:{
                    data: fs.readFileSync('upload/' + req.file.filename),
                    contentType:'image/jpg'
                },
            }
            const post = new Uplaod(Upload);
            post.save();
            res.json(post);
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = userController