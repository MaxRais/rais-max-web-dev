/**
 * Created by MaxRais on 6/12/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({}, {collection: "assignmentWidget"});

    return WidgetSchema;
};

