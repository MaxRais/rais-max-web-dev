/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("BracketController", BracketController);

    function BracketController($location, $window, $rootScope, $routeParams, ChallongeService) {

        var vm = this;
        function init() {
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
            vm.activeMatches = [];
            vm.pendingMatches = [];
            vm.completedMatches = [];
            vm.done = false;
            ChallongeService
                .getOneTournament($routeParams.url)
                .then(
                    function(res) {
                        vm.bracket = res.data.tournament;
                        ChallongeService
                            .getMatches(vm.bracket.url)
                            .then(
                                function(res) {
                                    vm.matches = res.data;
                                    console.log(vm.matches);
                                    for(var key in vm.matches) {
                                        var match = vm.matches[key].match;

                                        if(match.state == "pending") {
                                            vm.pendingMatches.push(match);
                                        }
                                        else if(match.state == "open") {
                                            getNames(vm.bracket, match);
                                            vm.activeMatches.push(match);
                                        }
                                        else if(match.state == "complete") {
                                            getNames(vm.bracket, match);
                                            vm.completedMatches.push(match);
                                        }
                                    }
                                }
                            ); 
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }
        init();

        function getNames(tournament, match) {
            ChallongeService
                .getParticipant(tournament.url, match.player1_id)
                .then(function(res) {
                    match.p1Name = res.data.participant.name;
                    return ChallongeService.getParticipant(tournament.url, match.player2_id);
                })
                .then(function(res) {
                    match.p2Name = res.data.participant.name;
                    return match;
                });
        }

    }
})();