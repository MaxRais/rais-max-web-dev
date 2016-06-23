/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService, ChallongeService) {

        var vm = this;
        vm.login = login;

        function login (username, password) {
            console.log("starting");

            var user = UserService
                .login(username, password)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user) {
                            $rootScope.currentUser = user;
                            var id = user._id;
                            $location.url("/user/"+id);
                        } else {
                            vm.error = "User not found";
                        }
                    },
                    function (error) {
                        vm.error = error.data;
                    });
        }
    }
})();