const express = require('express');
const router = express.Router();
const model = require('../models');

const selectMenuById = async (id) => await model['menu'].findOne({where: {id: id}});
const createTotalOrder = async (order) => await model['total_order'].create(order);
const createDetail = async (detail) => await model['detail'].create(detail);

router.post('/', async (req, res) => {
    let user_sn = req.body.user_sn;
    let detail = req.body.detail;

    let price = 0;
    let detail_str = "";

    for (const d of detail) {
        let menu = await selectMenuById(d.menu_id)
        price += menu.price * d.count;
        detail_str += menu.name+" ";
    }

    const order = await createTotalOrder({
        regdate: new Date(),
        user_sn: user_sn,
        price: price,
        detail: detail_str
    })

    for (const d of detail) {
        await createDetail({
            count: d.count,
            regdate: new Date(),
            menu_id: d.menu_id,
            total_order_id: order.id
        })
    }

    res.send();
});


const selectAllOrder = async (user_sn) => await model['total_order'].findAll({where: {user_sn: user_sn}});

router.get('/', async (req, res) => {
    let user_sn = req.cookies.user_sn;
    res.send({order: await selectAllOrder(user_sn)});
});

module.exports = router;