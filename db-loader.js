const SequelizeAuto = require('sequelize-auto')
const auto = new SequelizeAuto('pizza_alvolo', 'root', 'eoghks0014', { // DB_NAME, ID, PW
    host: 'localhost',  // DB Host 주소
    port: '3306',  // 포트 번호
    dialect: 'mysql'  // 사용하는 DBMS 종류
})

auto.run()