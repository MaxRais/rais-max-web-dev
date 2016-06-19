/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        var id = $routeParams["uid"];

        init();

        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function (response) {
                        vm.success = "User successfully updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function deleteUser() {
            UserService
                .deleteUser(id)
                .then(
                    function (success) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function init() {
            /*UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                });*/
            vm.user = $rootScope.currentUser;
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function () {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function () {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                );
        }
    }
})();
