/**
 * Created by MaxRais on 5/31/16.
 */

module.exports = function (app) {
    var userService = require("./services/user.service.server.js")(app);
    var websiteService = require("./services/website.service.server.js")(app);
    var pageService = require("./services/page.service.server.js")(app);
    var widgetService = require("./services/widget.service.server.js")(app);
};