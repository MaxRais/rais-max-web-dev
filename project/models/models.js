/**
 * Created by MaxRais on 6/6/16.
 */

module.exports = function() {
    var mongoose = require('mongoose');

    var connectionString = 'mongodb://localhost/cs4550summer1';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        process.env.FACEBOOK_CALLBACK_URL = "http://webdev-maxrais.rhcloud.com/auth/facebook/callback";
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server.js")();

    var models = {
        userModel: userModel,
    };

    return models;
};