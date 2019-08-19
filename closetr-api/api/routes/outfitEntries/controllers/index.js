const controller = require('./outfit_entries.controller');

module.exports = {
    addNewEntry: controller.add_new_entry,
    getEntry: controller.get_entry,
    deleteEntry: controller.delete_entry
};
