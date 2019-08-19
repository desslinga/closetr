const express = require('express');
const {
    addNewClothing,
    deleteClothing,
    getAllUserClothing
} = require('./controllers');

const router = express.Router();

router.post('/clothing', addNewClothing);
router.delete('/clothing/:clothing_id', deleteClothing);
router.get('/all', getAllUserClothing);

module.exports = router;
