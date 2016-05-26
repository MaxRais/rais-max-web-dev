/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        var id = $routeParams["id"];

        init();

        function updateUser() {
            var result = UserService.updateUser(vm.user._id, vm.user);
            if(result) {
                vm.success = "User successfully updated";
            }
            else {
                vm.error = "Could not update user";
            }
        }

        function init() {
            var user = UserService.findUserById(id);
            if(user) {
                vm.user = angular.copy(user);
            }
        }
    }
    
})();
