const controller = require('./users.controller');

module.exports = {
    checkLoginCreds: controller.check_login_credentials,
    updateUserInfo: controller.update_user_info,
    registerNewUser: controller.register_new_user
};