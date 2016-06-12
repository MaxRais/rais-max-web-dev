/**
 * Created by MaxRais on 6/5/16.
 */

module.exports = function (app, models) {

    var websiteModel = models.websiteModel;

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var uid = req.params["uid"];

        websiteModel
            .createWebsiteForUser(uid, website)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params["uid"];

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites) {
                    res.json(websites);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );
    }

    function findWebsiteById(req, res) {
        var wid = req.params["wid"];

        websiteModel
            .findWebsiteById(wid)
            .then(
                function(website){
                    res.send(website);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWebsite(req, res) {
        var id = req.params["wid"];
        var newWebsite = req.body;

        websiteModel
            .updateWebsite(id, newWebsite)
            .then(
                function(website) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Website not found");
                }
            );
    }

    function deleteWebsite(req, res) {
        var id = req.params["wid"];

        websiteModel
            .deleteWebsite(id)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Website not found");
                }
            );
    }

};