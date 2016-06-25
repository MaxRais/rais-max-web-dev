/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("SearchController", SearchController);

    function SearchController($location, $window, $rootScope, $routeParams, UserService, ChallongeService) {

        var vm = this;
        vm.search = search;
        vm.participants = [];
        vm.follow = follow;

        function init() {
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
            vm.query = $routeParams.query || "";
            if(!vm.user)
                vm.user = {username: 'login'};
            search(vm.query)
            $("body").tooltip({ selector: '[data-toggle=tooltip]' });

        }
        init();

        function search(query) {
            if(query)
                ChallongeService
                    .getOneTournament(query, true, true)
                    .then(
                        function(res) {
                            vm.results = res.data.tournament;
                            console.log("success: ", vm.results);
                            if(vm.results)
                                $('.tournament-iframe').challonge(vm.results.url, {subdomain: vm.results.subdomain, theme: '1', multiplier: '1.0', match_width_multiplier: '1.0', show_final_results: '0', show_standings: '0'});
                            else
                                $('.tournament-iframe').challonge("", { theme: '1', multiplier: '1.0', match_width_multiplier: '1.0', show_final_results: '0', show_standings: '0'});

                            findUsers();
                        },
                        function(err) {
                            console.log("error: " + err);
                        }
                    );
        }

        function findUsers() {
            var tournament = vm.results;
            UserService
                .findParticipants(tournament.id)
                .then(function(res) {
                    vm.participants = res.data;
                })
        }

        function follow(user) {
            console.log('yo');
            var index = vm.user.following.indexOf(user._id);
            if(index > -1) {
                vm.user.following.splice(index,1);
                UserService
                    .updateUser(vm.user._id, vm.user)
                    .then(function (user) {
                        console.log(user);
                        $window.localStorage.setItem("currentUser", angular.toJson(user.config.data));
                    });
            }
            else {
                vm.user.following.push(user._id);
                UserService
                    .updateUser(vm.user._id, vm.user)
                    .then(function (user) {
                        console.log(user);
                        $window.localStorage.setItem("currentUser", angular.toJson(user.config.data));
                    });
            }
        }

    }
})();