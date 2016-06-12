/**
 * Created by MaxRais on 6/12/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var Website = mongoose.model("Page", PageSchema);

    var api = {
    };
    return api;
};