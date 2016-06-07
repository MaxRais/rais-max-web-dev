/**
 * Created by MaxRais on 5/31/16.
 */

module.exports = function (app, models) {

    var userModel = models.userModel;

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user/:uid", findUserById);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

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
        for(var i in users) {
            if(users[i].username === username && users[i].password === password) {
                res.send(users[i]);
                return;
            }
        }
        res.status(403).send("User not found");
    }

    function findUserByUsername(username, res) {
        for(var i in users) {
            if(users[i].username === username) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function updateUser(req, res) {
        var id = req.params["uid"];
        var newUser = req.body;
        for(var i in users) {
            if(users[i]._id === id) {
                users[i] = newUser;
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("User not found");
    }

    function deleteUser(req, res) {
        var id = req.params["uid"];
        for(var i in users) {
            if(users[i]._id === id) {
                users.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("User not found");
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
