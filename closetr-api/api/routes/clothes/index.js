const express = require('express');
const clothes_controller = require('./clothes.controller');

const router = express.Router();

router.post('/clothing', clothes_controller.add_new_clothing);
router.delete('/clothing/:clothing_id', clothes_controller.delete_clothing);
router.get('/all', clothes_controller.get_all_user_clothing);

module.exports = router;
