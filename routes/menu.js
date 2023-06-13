const express = require('express');
const model = require("../models");
const router = express.Router();

const upload = require('../util/imgStorage')
const createMenu = async (menu) => await model['menu'].create(menu);

// TODO 삭제 예정
router.get('/create/test', function (req, res) {
    res.render('test/menuCreate.ejs')
});

router.post('/create', upload.single('image'),async (req, res) => {
    const file = req.file;
    const img_url = process.env.IMG_URL_PREFIX+file.filename;

    let date = new Date();
    date.setHours(date.getHours() + 9);
    const menu = await createMenu({
        img_url: img_url,
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        regdate: date
    })

    res.send(menu);
});

const selectAllMenu = async () => await model['menu'].findAll({order: [["regdate", "DESC"],],});
router.get('/', async (req, res) => {
    res.send({menus: await selectAllMenu()});
});

const selectOneMenu = async (id) => await model['menu'].findOne({where: {id: id}});
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    res.send({menu: await selectOneMenu(id)});
});

module.exports = router;