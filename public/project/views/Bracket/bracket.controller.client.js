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
            ChallongeService
                .getOneTournament($routeParams.url)
                .then(
                    function(res) {
                        vm.bracket = res.data.tournament;
                        ChallongeService
                            .getMatches("cs3200")
                            .then(
                                function(res) {
                                    vm.matches = res.data;
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

    }
})();