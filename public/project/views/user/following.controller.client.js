/**
 * Created by MaxRais on 6/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("FollowingController", FollowingController);

    function FollowingController($location, $window, $routeParams, $rootScope, UserService, ChallongeService) {
        var vm = this;

        function init() {
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
            vm.following = [vm.user];

            for(var index in vm.user.following) {
                var id = vm.user.following[index];
                UserService
                    .findUserById(id)
                    .then(function(user) {
                        vm.following.push(user);
                        var bracketIds = user.participating.map(function(p) {
                            return p.bracketId;
                        });
                        for(var b in bracketIds) {
                            ChallongeService
                                .findOneTournament(bracketIds[b])
                                .then(function(res) {
                                    console.log(res);
                                    vm.following[index].pTournaments.push(res.data.tournament);
                                });
                        }
                    });
            }
        }

        init();
    }
})();