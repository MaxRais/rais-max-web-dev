/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("SearchController", SearchController);

    function SearchController($location, $rootScope) {

        var vm = this;
        function init() {
            vm.user = $rootScope.currentUser;
            if(!vm.user)
                vm.user = {username: 'login'};
            
        }
        init();

    }
})();