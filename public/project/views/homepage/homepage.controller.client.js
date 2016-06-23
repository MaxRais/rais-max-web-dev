/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("HomepageController", HomepageController);

    function HomepageController($location, $window, $rootScope) {

        var vm = this;
        vm.search = search;
        function init() {
            vm.query = "";
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
            if(!vm.user)
                vm.user = {username: 'login'};
        }
        init();

        function search(query) {
            $location.url("/search/" + query)
        }

    }
})();