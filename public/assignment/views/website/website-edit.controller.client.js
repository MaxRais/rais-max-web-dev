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

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            var website = WebsiteService.findWebsiteById(wid);
            if(website) {
                vm.website = angular.copy(website);
            }
            vm.uid = uid;
            vm.wid = wid;
        }
        
        function updateWebsite() {
            var result = WebsiteService.updateWebsite(vm.website._id, vm.website);
            if(result) {
                vm.success = "User successfully updated";
            }
            else {
                vm.error = "Could not update user";
            }
        }

        function deleteWebsite() {
            var result = WebsiteService.deleteWebsite(vm.website._id);
            if(result) {
                vm.success = "User successfully updated";
            }
            else {
                vm.error = "Could not update user";
            }
        }

    }
})();
