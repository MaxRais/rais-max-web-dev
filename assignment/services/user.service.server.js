/**
 * Created by MaxRais on 5/31/16.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function (app, models) {

    var userModel = models.userModel;

    app.get('/auth/facebook/callback/',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
    }));

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.post("/api/user", createUser);
    app.post("/api/logout", logout);
    app.get ('/api/loggedin', loggedin);
    app.post("/api/login", passport.authenticate('webapp'), login);
    app.post("/api/register", register);
    app.get("/api/user/:uid", findUserById);
    app.get("/api/user", getUsers);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", authenticate, deleteUser);

    passport.use('webapp', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        var id = profile.id;
        userModel
            .findFacebookUser(id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    }
                    else {
                        var user = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        return userModel
                            .createUser(user);
                        }
                    }
                )
            .then(
                function (user) {
                    return done(null, user);
                }
            );
    }

    function authenticate(req, res, next) {
        //console.log(req.user);
        //console.log(req.isAuthenticated());
        if(req.isAuthenticated()) {
            next();
        }
        else {
            res.send(403);
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
        }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function loggedin(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        }
        else {
            res.send('0');
        }
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        res.status(400).send("Username already exists");
                        return;
                    }
                    else {
                        req.body.password = bcrypt.hashSync(password);
                        return userModel
                            .createUser(req.body);
                    }
                    //console.log(user);
                    res.send(200);
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function(user) {
                    if(user){
                        req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        }
                        else {
                            res.json(user);
                        }
                        });
                    }
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, req, res);
        } else if(username) {
            findUserByUsername(username, req, res);
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

    function findUserByCredentials(username, password, req, res) {
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

    function findUserByUsername(username, req, res) {
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
        //console.log(id);

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
