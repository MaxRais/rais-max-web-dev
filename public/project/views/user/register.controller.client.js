/**
 * Created by MaxRais on 5/26/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, $window, UserService) {

        var vm = this;
        vm.register = register;

        function init() {
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
        }
        init();

        function register (username, password, confirm) {
            if(username && password && confirm && password === confirm) {
                var user = {
                    username: username,
                    password: password
                };

                UserService
                    .register(username, password)
                    .then(
                        function(response) {
                            var newUser = response.data;
                            $window.localStorage.setItem("currentUser", angular.toJson(newUser));
                            $rootScope.currentUser = newUser;
                            $location.url("/user/"+newUser._id);
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    );
            }
        }
    }
})();
