/**
 * Created by MaxRais on 6/6/16.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;

    function createUser(user) {
        return User.create(user);
    }

    function findUserByUsername() {

    }

    function findUserByCredentials() {

    }

    function findUserById(id) {
        return User.findById(id);
    }

    function updateUser() {

    }

    function deleteUser() {

    }
};