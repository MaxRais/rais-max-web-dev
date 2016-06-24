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
            vm.activeMatches = [];
            vm.pendingMatches = [];
            vm.completedMatches = [];
            vm.activeMatch = {player1: 'asd', player2: 'asdasd'};
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
                                        if(match.state == "pending")
                                            vm.activeMatches.push(match);
                                        else if(match.state == "open")
                                            vm.pendingMatches.push(match);
                                        else if(match.state == "complete")
                                            vm.completedMatches.push(match);
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
                    .updateMatch(vm.bracket.url, vm.activeMatch.id, $scope.p1Score, $scope.p2Score)
                    .then(
                        function(res) {
                            console.log(res);
                            for(var key in vm.activeMatches) {
                                var match = vm.activeMatches[key];
                                if(match.id == vm.activeMatch.id)
                                    vm.activeMatches[key] = res.data;
                            }
                        },
                        function(err) {
                            console.log(err);
                        }
                    )
        }

    }
})();