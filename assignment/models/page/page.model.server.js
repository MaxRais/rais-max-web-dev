/**
 * Created by MaxRais on 6/12/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(id, page) {
        page._website = id;
        return Page.create(page);
    }

    function findAllPagesForWebsite(id) {
        return Page.find({_website: id});
    }

    function findPageById(id) {
        return Page.findById(id);
    }

    function updatePage(id, page) {
        return Page.update({_id: id}, page);
    }

    function deletePage(id) {
        return Page.remove({_id: id})
    }
};