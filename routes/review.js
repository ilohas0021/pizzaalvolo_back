const express = require('express');
const model = require("../models");
const router = express.Router();

const createReview = async (review) => await model['review'].create(review);
const selectAllReviewByMenuId = async (menu_id) => await model['review'].findAll({where: {menu_id: menu_id}});

const updateReviewStateTrue = async (order_id) => await model['total_order'].update({review: true}, {where: {id: order_id}});
const selectAllDetailByOrderId = async (order_id) => await model['detail'].findAll({where: {total_order_id: order_id}});
const selectUserBySn = async (sn) => await model['user'].findOne({where: {sn: sn}})

router.post('/', async (req, res) => {
    const order_id = req.body.order_id;
    const details = await selectAllDetailByOrderId(order_id);

    const user_sn = req.body.user_sn;
    const star = req.body.star;
    const info = req.body.info;
    const user = await selectUserBySn(user_sn);

    await updateReviewStateTrue(order_id);
    for (const d of details) {
        await createReview({
            star: star,
            info: info,
            name: user.name,
            user_sn: user_sn,
            detail_id: d.id,
            menu_id: d.menu_id,
        })
    }

    res.send();
});

router.get('/:menu_id', async (req, res, next) => {
    const menu_id = req.params.menu_id;
    const review = await selectAllReviewByMenuId(menu_id);
    res.send(review);
});

module.exports = router;