/**
 * Created by MaxRais on 6/12/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
    };

    return api;
    
    function createWidget(id, widget) {
        widget._page = id;
        return findAllWidgetsForPage(id)
            .then(
                function(widgets) {
                    widget.order = widgets.length;
                    return Widget.create(widget);
                }
            );
    }

    function findAllWidgetsForPage(id) {
        return Widget.find({_page: id});
    }

    function findWidgetById(id) {
        return Widget.findById(id);
    }

    function updateWidget(id, widget) {
        delete widget._id;
        return Widget.update({_id: id}, widget);
    }

    function deleteWidget(id) {
        return Widget.remove({_id: id})
    }
};
