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
            vm.following = vm.user.following;
            for(var key in vm.following) {
                vm.following[key].pTournaments = [];
            }

            console.log(vm.user);

            async.each(vm.following, 
                function(following, callback) {
                     ChallongeService
                        .getTournaments()
                        .then(function(res) {
                                var allTournies = res.data;
                                for(var i in allTournies) {
                                    var tourney = allTournies[i].tournament;
                                    for(var j in vm.following) {
                                        var follow = vm.following[j];
                                        if(follow.participating) {
                                            follow.participating.map(function (p) {
                                                if (p.bracketId == tourney.id) {
                                                    console.log(vm.following[j], tourney);
                                                    vm.following[j].pTournaments.push(tourney);
                                                    console.log(vm.following[j]);
                                                }
                                            })
                                        }
                                    }
                                }
                                console.log(vm.following);
                                callback();
                            },
                            function(err) {
                                console.log("error: " + err);
                                callback();
                        });
                }, 
                function(err) {
                    console.log(err);
                }
            );
        }

        init();
    }
})();