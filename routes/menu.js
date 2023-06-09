const express = require('express');
const model = require("../models");
const router = express.Router();

const upload = require('../util/imgStorage')
const createMenu = async (menu) => await model['menu'].create(menu);

// TODO 삭제 예정
router.get('/test', function (req, res) {
    res.render('menuInsert.ejs')
});

router.post('/', upload.single('image'),async (req, res) => {
    const file = req.file;
    const img_url = process.env.IMG_URL_PREFIX+file.filename;

    const menu = await createMenu({
        img_url: img_url,
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        regdate: new Date
    })

    res.send(menu);
});

module.exports = router;