/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
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

        var numWidgets = 0;

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            widget._id = numWidgets.toString();
            widget.pageId = pageId;
            widgets.push(widget);
            numWidgets++;
        }

        function findWidgetsByPageId(id) {
            var result = [];
            for(var i in widgets) {
                if(widgets[i].pageId === id) {
                    result.push(widgets[i]);
                }
            }
            return result;
        }

        function findWidgetById(wid) {
            for(var i in widgets) {
                if(widgets[i]._id === wid) {
                    return widgets[i];
                }
            }
            return null;
        }

        function updateWidget(id, newWidget) {
            for(var i in widgets) {
                if(widgets[i]._id === id) {
                    widgets[i] = newWidget;
                    console.log(widgets);
                    return true;
                }
            }
            console.log('no');
            return false;
        }

        function deleteWidget(id) {
            var toDelete = -1;
            for(var i in widgets) {
                if(widgets[i]._id === id) {
                    widgets.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }

})();