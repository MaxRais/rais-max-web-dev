/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, $window, UserService, ChallongeService) {

        var vm = this;
        vm.login = login;

        function init() {
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
            if(vm.user)
                $location.url("/user/" + vm.user._id)
        }
        init();

        function login (username, password) {

            //ChallongeService
                //.getTournaments()
                //.getOneTournament("test", true, true)
                //.createTournament("a tournament", "double elimination", "spaces2")
                //.deleteTournament('double')
                //.startTournament("cs3200")
                //.addParticipant('sample', 'rob', 1)
                //.deleteParticipant('sample', '41887154')
                //.getMatches('cs3200', '41882829')
                //.getOneMatch('cs3200', '64499104')
                //.updateMatch('cs3200', '64499104', '41882835', 1, 3)
                //.then(function(response) {
                //    console.log(response);
                //});

            var user = UserService
                .login(username, password)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user) {
                            $rootScope.currentUser = user;
                             $window.localStorage.setItem("currentUser", angular.toJson(user));
                            var id = user._id;
                            $location.url("/user/"+id);
                        } else {
                            vm.error = "User not found";
                        }
                    },
                    function (error) {
                        vm.error = error.data;
                    });
        }
    }
})();