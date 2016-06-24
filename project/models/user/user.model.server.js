/**
 * Created by MaxRais on 6/6/16.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        findFacebookUser: findFacebookUser,
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUsersForTournament: findUsersForTournament
    };

    return api;

    function findFacebookUser(id) {
        return User.findOne({'facebook.id': id});
    }

    function createUser(user) {
        return User.create(user);
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserById(id) {
        return User.findById(id);
    }

    function updateUser(id, newUser) {
        return User.findOneAndUpdate(
            {_id: id},
            {
                $set: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    brackets: newUser.brackets,
                    participating: newUser.participating,
                    following: newUser.following
                }
            },
            {new: true}
        )
    }

    function deleteUser(id) {
        return User.remove({_id: id});
    }

    function getFollowing(userIds) {
        var promise = User.find(function(err, users) {
            var resultUsers = [];
            for(var key in users) {
                var user = users[key];
                if(userIds.contains(user._id))
                    resultUsers.push(user);
            }
        })
    }
    
    function findUsersForTournament(id) {
        return User.find();
    }
};