/**
 * Created by MaxRais on 6/2/16.
 */

module.exports = function (app, models) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var widgetModel = models.widgetModel;

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.put("/api/page/:pid/widget", sortWidgets);

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var uid           = req.body.uid;
        var wid           = req.body.wid;
        var pid           = req.body.pid;
        var myFile        = req.file;

        if(myFile == null) {
            res.redirect("/assignment/#/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+widgetId);
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    widget.url = "/uploads/"+filename;
                    widget.width = width;
                    widgetModel
                        .updateWidget(widgetId, widget)
                        .then(
                            function(widget) {
                                res.redirect("/assignment/#/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+widgetId);
                            }
                        );
                }
            );
    }

    function createWidget(req, res) {
        var widget = req.body;
        var pid = req.params["pid"];

        widgetModel
            .createWidget(pid, widget)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var id = req.params["pid"];

        widgetModel
            .findAllWidgetsForPage(id)
            .then(
                function(widgets) {
                    res.json(widgets);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        var wid = req.params["wgid"];

        widgetModel
            .findWidgetById(wid)
            .then(
                function(widget) {
                    res.send(widget);
                },
                function(error) {
                    res.sendStatus(404);
                }
            );
    }

    function updateWidget(req, res) {
        var id = req.params["wgid"];
        var newWidget = req.body;

        widgetModel
            .updateWidget(id, newWidget)
            .then(
                function(widget) {
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(404);
                }
            );
    }

    function deleteWidget(req, res) {
        var id = req.params["wgid"];

        widgetModel
            .deleteWidget(id)
            .then(
                function(response) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(404);
                }
            );
    }

    function sortWidgets(req, res) {
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);
        var id = req.params["pid"];

        widgetModel
            .findAllWidgetsForPage(id)
            .then(function(widgets){
                widgets.forEach(function(widget){
                    if(start < end) {
                        if(widget.order > start && widget.order < end) {
                            widget.order--;
                            widget.save();
                        } else if(widget.order === start) {
                            widget.order = end;
                            widget.save();
                        }
                    } else {
                        if(widget.order >= end && widget.order < start) {
                            widget.order++;
                            widget.save();
                        } else if(widget.order === start) {
                            widget.order = end;
                            widget.save();
                        }
                    }
                    widgetModel
                        .updateWidget(widget._id, widget)
                        .then(
                            function(widget) {

                            }
                        )
                });
            });
    }
};
