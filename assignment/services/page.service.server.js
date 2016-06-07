/**
 * Created by MaxRais on 6/5/16.
 */

module.exports = function (app, models) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {
        var page = req.body;

        for(var i in pages) {
            if(pages[i].name === page.name) {
                res.status(400).send("Page name already in use");
                return;
            }
        }

        page._id = (new Date().getTime()) + "";
        pages.push(page);
        res.json(page);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params["wid"];
        var result = [];
        for(var i in pages) {
            if(pages[i].websiteId === wid) {
                result.push(pages[i]);
            }
        }
        res.send(result);
    }

    function findPageById(req, res) {
        var id = req.params["pid"];
        for(var i in pages) {
            if(pages[i]._id === id) {
                res.send(pages[i]);
                return;
            }
        }
        res.send({});
    }

    function updatePage(req, res) {
        var id = req.params["pid"];
        var newPage = req.body;
        for(var i in pages) {
            if(pages[i]._id === id) {
                pages[i] = newPage;
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Page not found");
    }

    function deletePage(req, res) {
        var id = req.params["pid"];
        for(var i in pages) {
            if(pages[i]._id === id) {
                pages.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Page not found");
    }

};