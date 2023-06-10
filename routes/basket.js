const express = require('express');
const model = require("../models");
const router = express.Router();

const selectAllBasketByUserSn = async (user_sn) => await model['basket'].findAll({where: {user_sn: user_sn}});
const deleteAllBasketByUserSn = async (user_sn) => await model['basket'].destroy({where: {user_sn: user_sn}});
const createBasket = async (basket) => await model['basket'].create(basket);

router.get('/', async function (req, res, next) {
    const user_sn = req.body.user_sn;

    await selectAllBasketByUserSn(user_sn);
    res.send();
});

router.post('/deleteAll', async function (req, res, next) {
    const user_sn = req.body.user_sn;

    const basket = await deleteAllBasketByUserSn(user_sn);
    res.send(basket);
});

router.post('/insert', async function (req, res, next) {
    const user_sn = req.body.user_sn;
    const menu_id = req.body.menu_id;

    await createBasket({
        user_sn: user_sn,
        menu_id: menu_id,
    })

    res.send();
});

module.exports = router;