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

    try {
        for (const d of detail) {
            let menu = await selectMenuById(d.menu_id)
            price += menu.price * d.count;
            detail_str += menu.name+" ";
        }

        const order = await createTotalOrder({
            regdate: new Date(),
            user_sn: user_sn,
            price: price,
            detail: detail_str,
            review: false
        })

        for (const d of detail) {
            await createDetail({
                count: d.count,
                regdate: new Date(),
                menu_id: d.menu_id,
                total_order_id: order.id
            })
        }
    }
    catch (e) {
        console.log(e)
    }


    res.send();
});


router.post('/totalCountEachMenu', async (req, res) => {
    const query = "SELECT menu_id, SUM(count) FROM detail GROUP BY menu_id;"
    const details = await model['detail'].query(query);

    let result = [];

    for(const d of details) {
        let menuName = await selectMenuById(d.menu_id).name;
        let tempJson = { "name": menuName, "cont":d.count }
        result.push(tempJson);
    }

    res.send(result);
});

router.get('/chart', async (req, res) => {
    const query =
        "SET sql_mode = '';" +
        "SELECT" +
        "CASE DAYOFWEEK(regdate)" +
        "WHEN 1 THEN '일요일'" +
        "WHEN 2 THEN '월요일'" +
        "WHEN 3 THEN '화요일'" +
        "WHEN 4 THEN '수요일'" +
        "WHEN 5 THEN '목요일'" +
        "WHEN 6 THEN '금요일'" +
        "WHEN 7 THEN '토요일'" +
        "END AS day_of_week," +
        "DATE_FORMAT(regdate, '%Y-%m-%d') AS date," +
        "SUM(price) AS total_sales" +
        "FROM" +
        "pizza_alvolo.total_order" +
        "WHERE" +
        "regdate >= CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY + INTERVAL 0 DAY" +
        "AND regdate < CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY + INTERVAL 7 DAY" +
        "GROUP BY" +
        "DATE_FORMAT(regdate, '%Y-%m-%d')" +
        "ORDER BY" +
        "regdate ASC;";

    const chart = await model['total_order'].query(query);
    res.send(chart);
});


const selectAllOrder = async (user_sn) => await model['total_order'].findAll({where: {user_sn: user_sn}});

router.get('/:user_sn', async (req, res) => {
    let user_sn = req.params.user_sn;
    if (user_sn !== undefined) res.send({order: await selectAllOrder(user_sn)});
});

module.exports = router;