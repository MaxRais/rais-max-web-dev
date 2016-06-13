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
        reorderWidget: reorderWidget
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
        return Widget.update({_id: id}, widget);
    }

    function deleteWidget(id) {
        return Widget.remove({_id: id})
    }

    function reorderWidget(id, start, end) {
        return Widget.find(function(err, widgets){
            widgets.forEach(function(widget){
                if(start < end) {
                    if(widget.order >= start && widget.order < end) {
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
            });
//            updateAllWidgets(widgets);
        });
    }

    function updateAllWidgets(widgets) {
        widgets.forEach(function(widget){
            Widget.update({_id: widget._id}, widget);
        });
    }
};
