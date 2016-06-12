/**
 * Created by MaxRais on 5/26/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {

        var vm = this;
        vm.register = register;

        function register (username, password, confirm) {
            if(password === confirm) {
                var user = {
                    username: username,
                    password: password
                };

                UserService
                    .createUser(user)
                    .then(
                        function(response) {
                            var newUser = response.data;
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
