/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("HomepageController", HomepageController);

    function HomepageController($location, $rootScope) {

        var vm = this;
        function init() {
            vm.user = $rootScope.currentUser;
            if(!vm.user)
                vm.user = {username: 'login'};
        }
        init();

    }
})();