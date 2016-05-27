/**
 * Created by MaxRais on 5/26/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService) {

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
                "websiteId": 0
            };
            PageService.createPage(wid, page);
        }
    }
})();
