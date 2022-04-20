const { Router } = require('express');
const { renderHomePage, renderAccountPage } = require('../controllers/home');
const { isLogin } = require('../middleware/');

const router = Router();

router.get('/', isLogin, renderHomePage);

router.get('/account', isLogin, renderAccountPage);

module.exports = router;
