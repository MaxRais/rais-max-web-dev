/**
 * Created by MaxRais on 5/26/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {

        var uid = $routeParams.uid;
        var vm = this;
        vm.create = create;
        vm.uid = uid;

        function create (name, desc) {
            var website = {
                "name": name,
                "description": desc
            };
            WebsiteService
                .createWebsite(uid, website)
                .then(
                    function(response) {
                        var newWebsite = response.data;
                        $location.url("/user/"+uid+"/website");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();
