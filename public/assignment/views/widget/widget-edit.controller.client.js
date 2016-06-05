/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;
        var wgid = $routeParams.wgid;

        init();

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(wgid)
                .then(
                    function(response) {
                        var widget = response.data;
                        if(widget) {
                            vm.widget = angular.copy(widget);
                        }
                    }
                );
            vm.uid = uid;
            vm.wid = wid;
            vm.pid = pid;
            vm.wgid = wgid;
        }

        function updateWidget() {
            WidgetService
                .updateWidget(vm.widget._id, vm.widget)
                .then(
                    function (response) {
                        vm.success = "Widget successfully updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widget._id)
                .then(
                    function(response) {
                        $location.url("/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

    }
})();
