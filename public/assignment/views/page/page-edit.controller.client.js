/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;

        init();

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            var page = PageService.findPageById(pid);
            if(page) {
                vm.page = angular.copy(page);
            }
            vm.uid = uid;
            vm.wid = wid;
            vm.pid = pid;
        }

        function updatePage() {
            var result = PageService.updatePage(vm.page._id, vm.page);
            if(result) {
                vm.success = "User successfully updated";
            }
            else {
                vm.error = "Could not update user";
            }
        }

        function deletePage() {
            var result = PageService.deletePage(vm.page._id);
            if(result) {
                vm.success = "User successfully updated";
            }
            else {
                vm.error = "Could not update user";
            }
        }

    }
})();
