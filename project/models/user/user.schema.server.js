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
        facebook: {
            id: String,
            displayName: String
        },
        google: {
            id: String
        },
        email: String,
        phone: String,
        brackets: [String],
        participating: [{
            bracketId: String,
            participantId: String
        }],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignmentUser"});

    return UserSchema;
};