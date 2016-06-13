/**
 * Created by MaxRais on 5/26/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    
    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;

        vm.uid = uid;
        vm.wid = wid;
        vm.pid = pid;
        WidgetService
            .findWidgetsByPageId(pid)
            .then(
                function (response) {
                    vm.widgets = response.data;
                },
                function (error) {
                    vm.error = error.data;
                }
            );

        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;
        vm.sorted = sorted;

        function getTrustedHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }

        function getTrustedUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length-1];
            if(id.indexOf("=") > -1) {
                var idParts = id.split("=");
                id = idParts[idParts.length-1];
            }
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function sorted(startIndex, endIndex) {
            console.log("ExperimentsController");
            console.log(startIndex);
            console.log(endIndex);
            WidgetService
                .sortWidgets(pid, startIndex, endIndex)
                .then(
                    function(response) {

                    },
                    function(error) {

                    }
                );
        }
    }
})();
