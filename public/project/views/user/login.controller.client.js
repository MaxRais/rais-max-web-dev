/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService, ChallongeService) {

        var vm = this;
        vm.login = login;

        function login (username, password) {
            console.log("starting");
            ChallongeService
                .getTournaments()
                //.getOneTournament("test", true, true)
                //.createTournament("my first", "double elimination", null)
                //.deleteTournament('2654670')
                //.startTournament("2654670")
                //.addParticipant('2654670', 'max', 1)
                //.deleteParticipant('2654670', '41859639')
                //.getMatches('test2')
                //.getOneMatch('2654670', 'matchId')
                //.updateMatch('2654670', 'match', '41859641', 2, 0)
                .then(function(response) {
                    console.log(response);
                });

            /*var user = UserService
                .login(username, password)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user) {
                            $rootScope.currentUser = user;
                            var id = user._id;
                            $location.url("/user/"+id);
                        } else {
                            vm.error = "User not found";
                        }
                    },
                    function (error) {
                        vm.error = error.data;
                    });*/
        }
    }
})();