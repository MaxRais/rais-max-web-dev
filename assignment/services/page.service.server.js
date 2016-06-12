/**
 * Created by MaxRais on 6/5/16.
 */

module.exports = function (app, models) {

    var pageModel = models.pageModel;

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {
        var page = req.body;
        var wid = req.params["wid"];

        pageModel
            .createPage(wid, page)
            .then(
                function(page){
                    res.json(page);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params["wid"];

        pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function(pages) {
                    res.json(pages);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );
    }

    function findPageById(req, res) {
        var id = req.params["pid"];

        pageModel
            .findPageById(id)
            .then(
                function(page) {
                    res.send(page);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updatePage(req, res) {
        var id = req.params["pid"];
        var newPage = req.body;
        
        pageModel
            .updatePage(id, newPage)
            .then(
                function(page) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );
    }

    function deletePage(req, res) {
        var id = req.params["pid"];

        pageModel
            .deletePage(id)
            .then(
                function(response) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(404);
                }
            );
    }

};