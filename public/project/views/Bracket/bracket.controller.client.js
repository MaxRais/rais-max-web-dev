/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("BracketController", BracketController);

    function BracketController($location, $window, $routeParams, UserService, ChallongeService) {

        var vm = this;
        function init() {
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
            vm.name = "";
            vm.seed = "";
            vm.add = add;
            vm.start = start;
            vm.activeMatches = [];
            vm.pendingMatches = [];
            vm.completedMatches = [];
            var redirect = $window.location.hash.includes("edit");

            ChallongeService
                .getOneTournament($routeParams.url)
                .then(
                    function(res) {
                        vm.bracket = res.data.tournament;
                        if(vm.bracket.state == "underway" && redirect)
                            $location.url("/brackets/"+vm.bracket.url);
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

        function add(name, seed) {
            var pid;
            ChallongeService
                .addParticipant(vm.bracket.url, name, seed ? seed : "1")
                .then(function(res) {
                    vm.name="";
                    vm.seed="1";
                    vm.success = "Participant: " + name + " added successfully";
                    pid = res.data.participant.id;
                    return UserService.findUserByUsername(name)
                })
                .then(function(res) {
                    if(res.data) {
                        return UserService.addParticipating(res.data._id, vm.bracket.id, pid);
                    }
                })
                .then(function(res) {
                });
        }

        function start() {
            ChallongeService
                .startTournament(vm.bracket.url)
                .then(function(res) {
                    $location.url("/brackets/"+vm.bracket.url);
                })
        }
    }
})();