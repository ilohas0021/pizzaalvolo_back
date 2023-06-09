const express = require('express');
const router = express.Router();
const model = require('../models');

const selectMenuById = async (id) => await model['menu'].findOne({where: {id: id}});
const createTotalOrder = async (order) => await model['total_order'].create(order);

router.post('/', async (req, res) => {
    let user_sn = req.body.user_sn;
    let detail = req.body.detail;

    let sumPrice = 0;
    for (let d in detail) {
        let menu = await selectMenuById(d.menu_id)
        // TODO
        console.log(menu)
    }
});


module.exports = router;