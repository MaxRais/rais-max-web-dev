/**
 * Created by MaxRais on 5/26/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {

        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var vm = this;
        vm.create = create;
        vm.uid = uid;
        vm.wid = wid;

        function create (name, desc) {
            var page = {
                "_id": 0,
                "name": name,
                "websiteId": wid
            };
            PageService
                .createPage(wid, page)
                .then(
                    function(response) {
                        var newPage = response.data;
                        $location.url("/user/"+uid+"/website/"+wid+"/page");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();
