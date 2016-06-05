/**
 * Created by MaxRais on 6/2/16.
 */

module.exports = function (app, model) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);

    function uploadImage(req, res) {
        console.log("here");

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/"+filename;
                widgets[i].width = width;
            }
        }

        res.redirect("/assignment/#/user/:uid/website/:wid/page/:pid/widget/"+widgetId);
    }

    function createWidget(req, res) {
        var widget = req.body;

        widget._id = (new Date().getTime()) + "";
        widgets.push(widget);
        res.json(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var id = req.params["pid"];
        var result = [];
        for(var i in widgets) {
            if(widgets[i].pageId === id) {
                result.push(widgets[i]);
            }
        }
        res.send(result);
    }

    function findWidgetById(req, res) {
        var wid = req.params["wgid"];
        for(var i in widgets) {
            if(widgets[i]._id === wid) {
                res.json(widgets[i]);
                return;
            }
        }
        res.send({});
    }

    function updateWidget(req, res) {
        var id = req.params["wgid"];
        var newWidget = req.body;
        for(var i in widgets) {
            if(widgets[i]._id === id) {
                widgets[i] = newWidget;
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Widget not found");
    }

    function deleteWidget(req, res) {
        var id = req.params["wgid"];
        for(var i in widgets) {
            if(widgets[i]._id === id) {
                widgets.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Widget not found");
    }
};
