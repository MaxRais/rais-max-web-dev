/**
 * Created by MaxRais on 5/26/16.
 */

/**
 * Created by MaxRais on 5/26/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($location, $routeParams, $sce, WidgetService) {
        var vm = this;

        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;

        vm.createWidget = createWidget;
        vm.uid = uid;
        vm.wid = wid;
        vm.pid = pid;

        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;


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

        function createWidget(widgetType) {
            var newWidget = {
                _id: 0,
                widgetType: widgetType
            };
            WidgetService.createWidget(pid, newWidget);
            $location.url("/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+newWidget._id);
        }
    }
})();
