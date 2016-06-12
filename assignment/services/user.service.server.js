/**
 * Created by MaxRais on 5/31/16.
 */

module.exports = function (app, models) {

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user/:uid", findUserById);
    app.get("/api/user", getUsers);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findUserById(req, res) {
        var id = req.params["uid"];

        userModel
            .findUserById(id)
            .then(
                function(user) {
                    res.send(user)
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.sendStatus(403).send("User not found")
                }
            );
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.send({});
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params["uid"];
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("User not found");
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params["uid"];

        userModel
            .deleteUser(id)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("User not found");
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(400).send("Username already in use");
                }
            );
    }
};
