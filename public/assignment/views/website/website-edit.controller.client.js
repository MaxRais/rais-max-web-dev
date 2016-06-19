/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        init();

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(wid)
                .then(
                    function (response) {
                        vm.website = response.data;
                    }
                );

            vm.uid = uid;
            vm.wid = wid;
        }
        
        function updateWebsite() {
            if(vm.website.name) {
                WebsiteService
                    .updateWebsite(vm.website._id, vm.website)
                    .then(
                        function (response) {
                            vm.success = "Website successfully updated";
                            $location.url("/user/"+uid+"/website")
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.website._id)
                .then(
                    function(response) {
                        $location.url("/user/"+uid+"/website");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

    }
})();
