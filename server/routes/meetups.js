const express = require('express');
const router = express.Router();

const MeetupsCtrl = require('../controllers/meetups');
const AuthCtrl = require('../controllers/auth')

router.get('', MeetupsCtrl.getMeetups);
//testing onlyAuthUsers to login to secret
router.get('/secret', AuthCtrl.onlyAuthUsers, MeetupsCtrl.getSecret);
router.get('/:id', MeetupsCtrl.getMeetupById);

module.exports = router;
