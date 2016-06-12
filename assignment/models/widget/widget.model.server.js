/**
 * Created by MaxRais on 6/12/16.
 */

/**
 * Created by MaxRais on 6/12/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widge", WidgetSchema);

    var api = {
    };
    return api;
};
