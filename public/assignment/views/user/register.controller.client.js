/**
 * Created by MaxRais on 5/26/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {

        var vm = this;
        vm.register = register;

        function register (username, password, confirm) {
            if(password === confirm) {
                var user = {
                    username: username,
                    password: password
                };

                UserService
                    .register(username, password)
                    .then(
                        function(response) {
                            var newUser = response.data;
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
