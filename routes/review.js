const express = require('express');
const model = require("../models");
const router = express.Router();

const createReview = async (review) => await model['review'].create(review);
const selectAllReviewByMenuId = async (menu_id) => await model['review'].findAll({where: {menu_id: menu_id}});
router.get('/test', function (req, res) {
    res.render('./test/.ejs');
});

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/review', async (req, res, next) => {
    const order_id = req.body.order_id;
    const user_id = req.body.user_id;
    const star = req.body.star;
    const info = req.body.info;

    await createReview({
        order_id: order_id,
        user_id: user_id,
        star: star,
        info: info
    })

    res.send();
});

router.get('/review', async (req, res, next) => {
    const menu_id = req.body.menu_id;
    const review = await selectAllReviewByMenuId(menu_id);
    res.send(review);
});

module.exports = router;