const express = require('express');
const {
    checkLoginCreds,
    updateUserInfo,
    registerNewUser
} = require('./controllers');

const router = express.Router();
router.post('/login', checkLoginCreds);
router.post('/update', updateUserInfo);
router.post('/register', registerNewUser);

module.exports = router;
