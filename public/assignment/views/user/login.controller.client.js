/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {

        var vm = this;
        vm.login = login;

        function login (username, password) {
            var user = UserService
                .findUserByCredentials(username, password)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user) {
                            var id = user._id;
                            $location.url("/user/" + id);
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