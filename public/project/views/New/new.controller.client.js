/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("ChallongeClient")
        .controller("NewController", NewController);

    function NewController($location, $window, UserService, ChallongeService) {

        var vm = this;
        vm.setType = setType;
        vm.createTournament = createTournament;
        function init() {
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
            if(!vm.user) $location.url('/login');
            vm.name = "";
            vm.url = "";
            vm.type = "single elimination";
            if(!vm.user)
                vm.user = {username: 'login'};
            $(".dropdown-menu li a").click(function(){
              $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
              $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
            });
        }
        init();

        function setType(type) {
            vm.type = type;
            console.log(type);
        }

        function createTournament() {
            ChallongeService
                .createTournament(vm.name, vm.type, vm.url)
                .then(
                    function(res) {
                        console.log(res);
                        if(res.data.errors) {
                            vm.error = res.data.errors[0];
                        }
                        else {
                            return UserService.addBracket(vm.user._id, res.data.tournament.id);
                        }
                    }
                )
                .then(
                    function(res) {
                        if(res) {
                            var user = res.data;
                            $window.localStorage.setItem("currentUser", angular.toJson(user));
                            $location.url("/user/" + user._id + "/brackets");
                        }
                    }
                );
        }

    }
})();