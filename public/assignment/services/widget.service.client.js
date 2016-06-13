/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidgets: sortWidgets
        };
        return api;

        function createWidget(pageId, widget) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(id) {
            var url = "/api/page/"+id+"/widget";
            return $http.get(url);
        }

        function findWidgetById(wid) {
            var url = "/api/widget/"+wid;
            return $http.get(url);
        }

        function updateWidget(id, newWidget) {
            var url = "/api/widget/"+id;
            return $http.put(url, newWidget);
        }

        function deleteWidget(id) {
            var url = "/api/widget/"+id;
            return $http.delete(url);
        }

        function sortWidgets(id, start, end) {
            var url = "/api/page/"+id+"/widget?start="+start+"&end="+end;
            return $http.put(url);
        }
    }

})();