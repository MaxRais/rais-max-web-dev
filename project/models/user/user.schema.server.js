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
        brackets: [Number],
        participating: [{
            bracketId: Number,
            participantId: Number
        }],
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignmentUser"});

    return UserSchema;
};