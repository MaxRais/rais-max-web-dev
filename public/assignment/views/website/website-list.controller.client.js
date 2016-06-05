/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var uid = $routeParams.uid;

        vm.uid = uid;
        WebsiteService
            .findWebsitesForUser(uid)
            .then(
                function (response) {
                    vm.websites = response.data;
                },
                function (error) {
                    vm.error = error.data;
                }
            );
    }
})();
