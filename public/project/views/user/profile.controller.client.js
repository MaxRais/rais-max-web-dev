/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $window, $routeParams, $rootScope, UserService, ChallongeService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        var id = $routeParams["uid"];

        init();

        function updateUser() {
            $window.localStorage.setItem("currentUser", angular.toJson(vm.user));
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
            vm.brackets = [];
            vm.participating = [];
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));

            if(vm.user._id != id) {
                UserService
                    .findUserById(id)
                    .then(
                        function(res) {
                            vm.otherUser = res.data;
                        }
                    )
            }
            
            ChallongeService
                .getTournaments()
                .then(function(res) {
                    var allBrackets = res.data;

                    var currentUser = vm.otherUser ? vm.otherUser : vm.user

                    if(!currentUser.participating)
                        vm.participating = [];
                    else
                        vm.participating = currentUser.participating.map(
                            function(obj) {
                                return obj.bracketId;
                        });

                    if(!currentUser.brackets)
                        vm.brackets = [];
                    else
                        for(var key in allBrackets) {
                            var bracket = allBrackets[key].tournament;
                            if(currentUser.brackets.includes(bracket.id)) {
                                vm.brackets.push(bracket);
                            }

                            if(vm.participating.includes(bracket.id))
                                vm.participating.push(bracket)
                        }
                });
        }

        
        function logout() {
            UserService
                .logout()
                .then(
                    function () {
                        $rootScope.currentUser = null;
                        $window.localStorage.setItem("currentUser", null);
                        $location.url("/login");
                    },
                    function () {
                        $rootScope.currentUser = null;
                        $window.localStorage.setItem("currentUser", null);
                        $location.url("/login");
                    }
                );
        }
    }
})();
