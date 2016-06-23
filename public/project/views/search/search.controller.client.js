/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("SearchController", SearchController);

    function SearchController($location, $rootScope, $routeParams, ChallongeService) {

        var vm = this;
        vm.search = search;
        function init() {
            vm.user = $rootScope.currentUser;
            vm.query = $routeParams.query || "";
            if(!vm.user)
                vm.user = {username: 'login'};
            search(vm.query)

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
                            $('.tournament-iframe').challonge(vm.results.url, {subdomain: vm.results.subdomain, theme: '1', multiplier: '1.0', match_width_multiplier: '1.0', show_final_results: '0', show_standings: '0'});
                        },
                        function(err) {
                            console.log("error: " + err);
                        }
                    );
        }

    }
})();