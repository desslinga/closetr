const express = require('express');
const {
    addNewEntry,
    getEntry,
    deleteEntry
} = require('./controllers');

const router = express.Router();
router.post('/entry', addNewEntry);
router.get('/entry', getEntry);
router.delete('/entry/:id', deleteEntry);

module.exports = router;
