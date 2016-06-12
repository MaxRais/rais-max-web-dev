/**
 * Created by MaxRais on 6/7/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: String,
        description: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignmentWebsite"});

    return WebsiteSchema;

};