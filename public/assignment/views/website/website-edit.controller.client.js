/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        init();

        function init() {
            vm.website = WebsiteService.findWebsiteById(wid);
        }

    }
})();
