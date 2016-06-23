/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("HomepageController", HomepageController);

    function HomepageController($location, $rootScope) {

        var vm = this;
        vm.search = search;
        function init() {
            vm.query = "";
            vm.user = $rootScope.currentUser;
            if(!vm.user)
                vm.user = {username: 'login'};
        }
        init();

        function search(query) {
            $location.url("/search/" + query)
        }

    }
})();