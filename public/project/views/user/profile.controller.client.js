/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $window, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        var id = $routeParams["uid"];

        init();

        function updateUser() {
            console.log(vm.user);
            $window.localStorage.setItem("currentUser", angular.toJson(vm.user));
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function (response) {
                        vm.success = "User successfully updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function deleteUser() {
            UserService
                .deleteUser(id)
                .then(
                    function (success) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function init() {
            /*UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                });*/
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
            console.log(vm.user);
            vm.brackets = [JSON.parse('{"id":2656002,"name":"database","url":"cs3200","description":"","state":"underway","private":false,"category":null,"teams":null,"ranked":false,"subdomain":"brackets","tournamentType":"single elimination","startedAt":"2016-06-23T13:38:14.678-05:00","completedAt":null,"requireScoreAgreement":false,"notifyUsersWhenMatchesOpen":true,"createdAt":"2016-06-23T11:52:27.601-05:00","updatedAt":"2016-06-23T13:38:14.834-05:00","openSignup":false,"notifyUsersWhenTheTournamentEnds":true,"progressMeter":11,"quickAdvance":false,"holdThirdPlaceMatch":false,"ptsForGameWin":"0.0","ptsForGameTie":"0.0","ptsForMatchWin":"1.0","ptsForMatchTie":"0.5","ptsForBye":"1.0","swissRounds":0,"rankedBy":null,"showRounds":false,"hideForum":false,"sequentialPairings":false,"acceptAttachments":false,"rrPtsForGameWin":"0.0","rrPtsForGameTie":"0.0","rrPtsForMatchWin":"1.0","rrPtsForMatchTie":"0.5","createdByApi":true,"creditCapped":false,"hideSeeds":false,"predictionMethod":0,"predictionsOpenedAt":null,"anonymousVoting":false,"maxPredictionsPerUser":1,"signupCap":null,"gameId":null,"participantsCount":10,"groupStagesEnabled":false,"allowParticipantMatchReporting":true,"checkInDuration":null,"startAt":null,"startedCheckingInAt":null,"tieBreaks":null,"lockedAt":null,"eventId":null,"publicPredictionsBeforeStartTime":null,"grandFinalsModifier":null,"descriptionSource":"","fullChallongeUrl":"http://brackets.challonge.com/cs3200","liveImageUrl":"http://brackets.challonge.com/cs3200.svg","signUpUrl":null,"reviewBeforeFinalizing":true,"acceptingPredictions":false,"participantsLocked":true,"gameName":null,"participantsSwappable":false,"teamConvertable":false,"groupStagesWereStarted":false}'), JSON.parse('{"id":2656002,"name":"database","url":"cs3200","description":"","state":"underway","private":false,"category":null,"teams":null,"ranked":false,"subdomain":"brackets","tournamentType":"single elimination","startedAt":"2016-06-23T13:38:14.678-05:00","completedAt":null,"requireScoreAgreement":false,"notifyUsersWhenMatchesOpen":true,"createdAt":"2016-06-23T11:52:27.601-05:00","updatedAt":"2016-06-23T13:38:14.834-05:00","openSignup":false,"notifyUsersWhenTheTournamentEnds":true,"progressMeter":11,"quickAdvance":false,"holdThirdPlaceMatch":false,"ptsForGameWin":"0.0","ptsForGameTie":"0.0","ptsForMatchWin":"1.0","ptsForMatchTie":"0.5","ptsForBye":"1.0","swissRounds":0,"rankedBy":null,"showRounds":false,"hideForum":false,"sequentialPairings":false,"acceptAttachments":false,"rrPtsForGameWin":"0.0","rrPtsForGameTie":"0.0","rrPtsForMatchWin":"1.0","rrPtsForMatchTie":"0.5","createdByApi":true,"creditCapped":false,"hideSeeds":false,"predictionMethod":0,"predictionsOpenedAt":null,"anonymousVoting":false,"maxPredictionsPerUser":1,"signupCap":null,"gameId":null,"participantsCount":10,"groupStagesEnabled":false,"allowParticipantMatchReporting":true,"checkInDuration":null,"startAt":null,"startedCheckingInAt":null,"tieBreaks":null,"lockedAt":null,"eventId":null,"publicPredictionsBeforeStartTime":null,"grandFinalsModifier":null,"descriptionSource":"","fullChallongeUrl":"http://brackets.challonge.com/cs3200","liveImageUrl":"http://brackets.challonge.com/cs3200.svg","signUpUrl":null,"reviewBeforeFinalizing":true,"acceptingPredictions":false,"participantsLocked":true,"gameName":null,"participantsSwappable":false,"teamConvertable":false,"groupStagesWereStarted":false}')]
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function () {
                        $rootScope.currentUser = null;
                        $window.localStorage.setItem("currentUser", null);
                        $location.url("/login");
                    },
                    function () {
                        $rootScope.currentUser = null;
                        $window.localStorage.setItem("currentUser", null);
                        $location.url("/login");
                    }
                );
        }
    }
})();
