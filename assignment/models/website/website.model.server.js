/**
 * Created by MaxRais on 6/7/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        findAllWebsitesForUser: findAllWebsitesForUser
    };
    return api;

    function findAllWebsitesForUser(id) {
        return Website.find({_user: id});
    }
};
