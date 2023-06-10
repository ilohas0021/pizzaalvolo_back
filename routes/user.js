const express = require('express');
const model = require("../models");
const router = express.Router();

const selectUserById = async (id) => await model['user'].findOne({where: {id: id}});
const updateUserBySn = async (sn, address) => await model['user'].update({address: address}, {where: {sn: sn}});
const createUser = async (user) => await model['user'].create(user);

/* GET users listing. */
router.get('/test', function (req, res) {
  res.render('./test/login.ejs');
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async (req, res, next) => {
  const id = req.body.id;
  const pw = req.body.pw;

  let user = await selectUserById(id);

  if (user !== null) {
    if (user.pw === pw) {
      res.send(user.sn);
    } else {
      res.status(500).send();
      console.log("pw error");
    }
  } else {
    res.status(500).send();
    console.log("id error");
  }
});

router.post('/update', async function (req, res, next) {
  const sn = req.body.sn;
  const address = req.body.address;

  await updateUserBySn(sn, address);
  res.send();
});

router.post('/signup', async (req, res, next) => {
  const id = req.body.id;
  const pw = req.body.pw;
  const name = req.body.name;
  const authority = req.body.authority;
  const address = req.body.address;

  await createUser({
    id: id,
    pw: pw,
    name: name,
    authority: authority,
    address: address,
  })

  res.send();

});
module.exports = router;
