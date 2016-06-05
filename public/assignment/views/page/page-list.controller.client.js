/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        vm.uid = uid;
        vm.wid = wid;
        PageService
            .findPagesByWebsiteId(wid)
            .then(
                function (response) {
                    vm.pages = response.data;
                },
                function (error) {
                    vm.error = error.data;
                }
            );
    }
})();
