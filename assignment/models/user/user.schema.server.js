/**
 * Created by MaxRais on 6/6/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema  = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignmentUser"});

    return UserSchema;
};