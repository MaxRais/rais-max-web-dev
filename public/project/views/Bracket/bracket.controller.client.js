/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("BracketController", BracketController);

    function BracketController($location, $scope, $window, $rootScope, $routeParams, ChallongeService) {

        var vm = this;
        vm.submitMatch= submitMatch;
        vm.showModal = showModal;
        function init() {
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
            vm.name = "";
            vm.seed = "";
            vm.add = add;
            vm.start = start;
            vm.activeMatches = [];
            vm.pendingMatches = [];
            vm.completedMatches = [];
            vm.activeMatch = {player1: 'asd', player2: 'asdasd'};
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

        function showModal(match) {
            vm.activeMatch = match;
            $scope.p1Score = null;
            $scope.p2Score = null;
            $scope.winner = null;
            $('#matchModal').modal('toggle');
        }

        function myscope($scope) {
          $scope.button = 'red';
        }

        function submitMatch() {
            var winner;
            if($scope.winner == 1) 
                winner = vm.activeMatch.player1_id
            if($scope.winner == 2)
                winner = vm.activeMatch.player2_id;
            if(winner)
                ChallongeService
                    .updateMatch(vm.bracket.url, vm.activeMatch.id, winner, $scope.p1Score, $scope.p2Score)
                    .then(
                        function(res) {
                            for(var key in vm.activeMatches) {
                                var match = vm.activeMatches[key];
                                if(match.id == res.data.match.id)
                                    vm.activeMatches.splice(key,1);
                            }
                            $('#matchModal').modal('hide');
                        },
                        function(err) {
                            console.log(err);
                        }
                    )
        }
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
            ChallongeService
                .addParticipant(vm.bracket.url, name, seed ? seed : "1")
                .then(function(res) {
                    vm.name="";
                    vm.seed="1";
                    vm.success = "Participant: " + name + " added successfully";
                    $location.url("/brackets/"+vm.bracket.url+"/edit");
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