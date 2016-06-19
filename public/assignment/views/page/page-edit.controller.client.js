/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;

        init();

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageById(pid)
                .then(
                    function (response) {
                        vm.page = response.data;
                    }
                );
            vm.uid = uid;
            vm.wid = wid;
            vm.pid = pid;
        }

        function updatePage() {
            if(vm.page.name) {
                PageService
                    .updatePage(vm.page._id, vm.page)
                    .then(
                        function (response) {
                            vm.success = "Page successfully updated";
                            $location.url("/user/"+uid+"/website/"+wid+"/page");
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }
        }

        function deletePage() {
            PageService
                .deletePage(vm.page._id)
                .then(
                    function(response) {
                        $location.url("/user/"+uid+"/website/"+wid+"/page");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

    }
})();
