/**
 * Created by MaxRais on 5/31/16.
 */

module.exports = function (app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:uid", findUserById);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);
    
    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, res);
        }
        else if(username) {
            findUserByUsername(username, res);
        }
        else {
            res.send(users);
        }
    }

    function findUserById(req, res) {
        var userId = req.params["uid"];
        for(var i in users) {
            if(users[i]._id === userId) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
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

        for(var i in users) {
            if(users[i].username === user.username) {
                res.status(400).send("Username already in use");
                return;
            }
        }

        user._id = (new Date().getTime()) + "";
        users.push(user);
        res.json(user);
    }
};
