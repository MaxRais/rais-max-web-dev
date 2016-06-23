/**
 * Created by MaxRais on 5/23/16.
 */

(function(){
    angular
        .module("ChallongeClient")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/homepage/homepage.view.client.html",
                controller: "HomepageController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
                //resolve: {
                //    loggedin: checkLoggedin
                //}
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
                //resolve: {
                //    loggedin: checkLoggedin
                //}
            })
            .when("/search", {
                templateUrl: "views/search/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/search/:query", {
                templateUrl: "views/search/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            });

        function checkLoggedin(UserService, $q, $location, $rootScope) {

            var deferred = $q.defer();

            UserService
                .checkLoggedin()
                .then(
                    function(response) {
                        var user = response.data;
                        console.log(user);
                        if(user == '0') {
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/login")
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        console.log(err);
                        $rootScope.currentUser = null;
                        deferred.reject();
                    }
                );

            return deferred.promise;
        }
    }
})();
