/**
 * Created by MaxRais on 6/5/16.
 */

module.exports = function (app) {
    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456"},
        {"_id": "234", "name": "Tweeter", "developerId": "456"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123"},
        {"_id": "678", "name": "Checkers", "developerId": "123"},
        {"_id": "789", "name": "Chess", "developerId": "234"}
    ];

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;

        for(var i in websites) {
            if(websites[i].name === website.name) {
                res.status(400).send("Website name already in use");
                return;
            }
        }

        website._id = (new Date().getTime()) + "";
        websites.push(website);
        res.json(website);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params["uid"];
        var result = [];
        for(var i in websites) {
            if(websites[i].developerId === userId) {
                result.push(websites[i]);
            }
        }
        res.send(result);
    }

    function findWebsiteById(req, res) {
        var wid = req.params["wid"];
        for(var i in websites) {
            if(websites[i]._id === wid) {
                res.send(websites[i]);
                return;
            }
        }
        res.send({});
    }

    function updateWebsite(req, res) {
        var id = req.params["wid"];
        var newWebsite = req.body;
        for(var i in websites) {
            if(websites[i]._id === id) {
                websites[i] = newWebsite;
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Website not found");
    }

    function deleteWebsite(req, res) {
        var id = req.params["wid"];
        for(var i in websites) {
            if(websites[i]._id === id) {
                websites.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Website not found");
    }

};