const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');
const AuthCtrl = require('../controllers/auth');

router.get('', UsersCtrl.getUsers);
router.get('/me', AuthCtrl.onlyAuthUsers, UsersCtrl.getCurrentUser);
router.post('/register', UsersCtrl.registerUsers);
router.post('/login', UsersCtrl.loginUsers);
router.post('/logout', UsersCtrl.logout);

module.exports = router;
