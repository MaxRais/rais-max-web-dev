/**
 * Created by MaxRais on 5/26/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService) {

        var uid = $routeParams.uid;
        var vm = this;
        vm.create = create;
        vm.uid = uid;
        console.log(uid);

        function create (name, desc) {
            var website = {
                "_id": 0,
                "name": name,
                "developerId": 0
            };
            WebsiteService.createWebsite(uid, website);
        }
    }
})();
