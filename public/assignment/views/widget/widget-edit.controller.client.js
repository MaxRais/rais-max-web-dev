/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;
        var wgid = $routeParams.wgid;

        init();

        vm.updatePage = updateWidget;
        vm.deletePage = deleteWidget;

        function init() {
            var widget = WidgetService.findWidgetById(wgid);
            if(widget) {
                vm.widget = angular.copy(widget);
            }
            vm.uid = uid;
            vm.wid = wid;
            vm.pid = pid;
            vm.wgid = wgid;
        }

        function updateWidget() {
            var result = WidgetService.updateWidget(vm.widget._id, vm.widget);
            if(result) {
                vm.success = "User successfully updated";
            }
            else {
                vm.error = "Could not update user";
            }
        }

        function deleteWidget() {
            var result = WidgetService.deleteWidget(vm.widget._id);
            if(result) {
                vm.success = "User successfully updated";
            }
            else {
                vm.error = "Could not update user";
            }
        }

    }
})();
