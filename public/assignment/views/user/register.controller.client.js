/**
 * Created by MaxRais on 5/26/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService) {

        var vm = this;
        vm.register = register;

        function register (username, password, confirm) {
            if(password === confirm) {
                var user = {
                    _id: "0",
                    username: username,
                    password: password,
                    firstName: username,
                    lastName: username
                };
                UserService.createUser(user);
            }
        }
    }
})();
