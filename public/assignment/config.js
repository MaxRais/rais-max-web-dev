/**
 * Created by MaxRais on 5/23/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider.when("/login", {
            templateUrl: "views/user/login.view.client.html"
        });

        $routeProvider.when("/register", {
            templateUrl: "views/user/register.view.client.html"
        });
    }
})();
