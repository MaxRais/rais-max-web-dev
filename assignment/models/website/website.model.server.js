/**
 * Created by MaxRais on 6/7/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;
    
    function createWebsiteForUser(id, website) {
        website._user = id;
        return Website.create(website);
    }

    function findAllWebsitesForUser(id) {
        return Website.find({_user: id});
    }

    function findWebsiteById(id) {
        return Website.findById(id);
    }

    function updateWebsite(id, website) {
        return Website.update({_id: id}, website);
    }

    function deleteWebsite(id) {
        return Website.remove({_id: id})
    }
};
