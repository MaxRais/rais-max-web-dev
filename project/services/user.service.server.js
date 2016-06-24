var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passport         = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var userModel = models.userModel;

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
    }));

    app.post("/api/user", createUser);
    app.get("/api/user/brackets/:bracketId", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.put("/api/user/:userId/brackets/:bracketId", addBracket);
    app.put("/api/user/:userId/participating", addParticipating);
    app.put("/api/user/:userId/participating", addParticipating);
    app.put("/api/user/:uid/follow/:tid", followUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user", findUserByCredentials);
    app.post('/api/login', passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get('/api/loggedin', loggedin);
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    passport.use('wam', new LocalStrategy(localStrategy));
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
                    } else {
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

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        res.status(400).send("Username already exists");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(password);
                        return userModel
                            .createUser(req.body);
                    }
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
                            } else {
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

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res, done) {
        var user = req.user;
        //console.log("USER: " + user);
        res.json(user);
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    //console.log("username: " + username);
                    //console.log("password: " + password);
                    //console.log("user.password: " + user);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        //console.log('2');
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove user with ID: " + id);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to update user with ID: " + id);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(
                function(user) {
                    console.log(user);
                    res.json(user);
                },
                function(error) {
                    res.status(400).send("Username " + newUser.username + " is already in use");
                }
        );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user){
                    res.send(user);
                },
                function(error){
                    res.status(400).send(error);
                }
            );
    }

    function getUsers(req, res) {
        var tournamentId = req.params["bracketId"];
        userModel
            .findUsersForTournament(tournamentId)
            .then(
                function(users) {
                    var result = [];
                    for(var i in users) {
                        var user = users[i];
                        if (user.participating.length > 0) {
                            var bracketIds = user.participating.map(function (p) {
                                return p.bracketId;
                            });
                            var contains = false;
                            for(var b in bracketIds) {
                                if (bracketIds[b] == tournamentId)
                                    contains = true;
                            }
                            if (contains) {
                                result.push(user);
                            }
                        }
                    }
                    res.send(result);
                },
                function(error){
                    res.status(400).send(error);
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
                function(err) {
                    res.status(403).send("no user exists");
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
                function(err) {
                    res.status(403).send("no user exists");
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

    function addBracket(req, res) {
        var uid = req.params["userId"];
        var bid = req.params["bracketId"];

        userModel
            .findUserById(uid)
            .then(function(user) {
                user.brackets.push(bid);
                return userModel.updateUser(uid, user);
            })
            .then(function(user) {
                res.json(user);
            })
    }

    function addParticipating(req, res) {
        var uid = req.params["userId"];
        var participating = req.body;

        userModel
            .findUserById(uid)
            .then(function(user) {
                user.participating.push(participating);
                return userModel.updateUser(uid, user);
            })
            .then(function(user) {
                res.json(user);
            })
    }

    function followUser(req, res) {
        var uid = req.params["uid"];
        var tid = req.params["tid"];

        userModel
            .findUserById(uid)
            .then(function(user) {
                user.following.push(tid);
                return userModel.updateUser(uid, user);
            })
            .then(function(user) {
                res.json(user);
            })
    }
};
