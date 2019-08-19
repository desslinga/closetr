const controller = require('./clothes.controller');

module.exports = {
    addNewClothing: controller.add_new_clothing,
    deleteClothing: controller.delete_clothing,
    getAllUserClothing: controller.get_all_user_clothing
};
