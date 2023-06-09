const express = require("express");
const router = express.Router();

const path = require('path');
const upload = require('../util/imgStorage')

// TODO 삭제 예정
router.get("/upload", function (req, res){
    res.render('upload.ejs')
})

router.post("/upload", upload.single('image'),async (req, res) => {
    const file = req.file
    // Respond with the file details
    res.send({
        message: "Uploaded",
        id: file.id,
        name: file.filename,
        contentType: file.contentType,
    })
})

router.get("/:img", async (req, res) => {
    res.sendFile(path.resolve(process.env.IMG_PATH + req.params.img));
})

module.exports = router;
