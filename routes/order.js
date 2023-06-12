const express = require('express');
const router = express.Router();
const model = require('../models');
const db = require('../models/index');
const {QueryTypes} = require("sequelize");

const selectMenuById = async (id) => await model['menu'].findOne({where: {id: id}});
const createTotalOrder = async (order) => await model['total_order'].create(order);
const createDetail = async (detail) => await model['detail'].create(detail);

router.post('/', async (req, res) => {
    let user_sn = req.body.user_sn;
    let detail = req.body.detail;

    let price = 0;
    let detail_str = "";

    let date = new Date();
    date.setHours(date.getHours() + 9);
    try {
        for (const d of detail) {
            let menu = await selectMenuById(d.menu_id)
            price += menu.price * d.count;
            detail_str += menu.name+", ";
        }

        const order = await createTotalOrder({
            regdate: date,
            user_sn: user_sn,
            price: price,
            detail: detail_str,
            review: false
        })

        for (const d of detail) {
            await createDetail({
                count: d.count,
                regdate: date,
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

const totalCountEachMenu = async () => await model['detail'].findAll({attributes: ['menu_id', sequelize.fn('sum', sequelize.col('count')) ], group: ['menu_id']});

router.get('/totalCountEachMenu', async (req, res) => {
    const query = "SELECT menu_id, SUM(count) count FROM detail GROUP BY menu_id;"
    const details = await db.sequelize.query(query, {type: QueryTypes.SELECT});

    let result = [];

    for(const d of details) {
        let menu = await selectMenuById(d.menu_id);
        let tempJson = {"id": d.menu_id, "name": menu.name, "count":d.count }
        result.push(tempJson);
    }

    res.send({"menu_data": result});
});

router.get('/chart', async (req, res) => {
    const query =
        "SELECT " +
        "CASE DAYOFWEEK(regdate) " +
        "WHEN 1 THEN '일요일' " +
        "WHEN 2 THEN '월요일' " +
        "WHEN 3 THEN '화요일' " +
        "WHEN 4 THEN '수요일' " +
        "WHEN 5 THEN '목요일' " +
        "WHEN 6 THEN '금요일' " +
        "WHEN 7 THEN '토요일' " +
        "END AS day_of_week, " +
        "DATE_FORMAT(regdate, '%Y-%m-%d') AS date, " +
        "SUM(price) AS total_sales " +
        "FROM " +
        "pizza_alvolo.total_order " +
        "WHERE " +
        "regdate >= CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY + INTERVAL 0 DAY " +
        "AND regdate < CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY + INTERVAL 7 DAY " +
        "GROUP BY " +
        "DATE_FORMAT(regdate, '%Y-%m-%d') " +
        "ORDER BY " +
        "regdate ASC;";

    await db.sequelize.query("SET sql_mode = '';");
    const chart = await db.sequelize.query(query, {type: QueryTypes.SELECT});
    res.send({"chart": chart});
});


const selectAllOrder = async (user_sn) => await model['total_order'].findAll({where: {user_sn: user_sn}, order: [["regdate", "DESC"],]});

router.get('/:user_sn', async (req, res) => {
    let user_sn = req.params.user_sn;
    if (user_sn !== undefined) res.send({order: await selectAllOrder(user_sn)});
});

module.exports = router;