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
        vm.websites = WebsiteService.findWebsitesForUser(uid);

    }
})();
