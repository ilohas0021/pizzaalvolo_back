const express = require('express');
const model = require("../models");
const router = express.Router();

const selectAllBasketByUserSn = async (user_sn) => await model['basket'].findAll({where: {user_sn: user_sn}});
const deleteAllBasketByUserSn = async (user_sn) => await model['basket'].destroy({where: {user_sn: user_sn}});
const selectOneMenu = async (id) => await model['menu'].findOne({where: {id: id}});
const createBasket = async (basket) => await model['basket'].create(basket);

router.get('/:user_sn', async function (req, res, next) {
    const user_sn = req.params.user_sn;
    let basket = await selectAllBasketByUserSn(user_sn);
    let result = [];

    for (const cur of basket) {
        let menu = await selectOneMenu(cur.menu_id);
        result.push({
            img_url: menu.img_url,
            name: menu.name,
            price: menu.price,
            menu_id: menu.id,
        });
    }

    res.send({"basket": result});
});

router.post('/deleteAll', async function (req, res, next) {
    const user_sn = req.body.user_sn;

    await deleteAllBasketByUserSn(user_sn);
    res.send();
});

router.post('/insert', async function (req, res, next) {
    const user_sn = req.body.user_sn;
    const menu_id = req.body.menu_id;
    const count = req.body.count;

    await createBasket({
        user_sn: user_sn,
        menu_id: menu_id,
        count: count,
    });

    res.send();
});

module.exports = router;