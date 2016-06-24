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
            .when("/user/:uid/brackets", {
                templateUrl: "views/user/brackets.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
                //resolve: {
                //    loggedin: checkLoggedin
                //}
            })
            .when("/user/:uid/participating", {
                templateUrl: "views/user/participating.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
                //resolve: {
                //    loggedin: checkLoggedin
                //}
            })
            .when("/user/:uid/following", {
                templateUrl: "views/user/following.view.client.html",
                controller: "FollowingController",
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
            .when("/new", {
                templateUrl: "views/new/new.view.client.html",
                controller: "NewController",
                controllerAs: "model"
            })
            .when("/search/:query", {
                templateUrl: "views/search/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/brackets/:url", {
                templateUrl: "views/bracket/bracket.view.client.html",
                controller: "BracketController",
                controllerAs: "model"
            })
            .when("/brackets/:url/edit", {
                templateUrl: "views/bracket/bracket.edit.client.html",
                controller: "BracketController",
                controllerAs: "model"
            });

        function checkLoggedin(UserService, $q, $location, $rootScope, $window) {

            var deferred = $q.defer();

            UserService
                .checkLoggedin()
                .then(
                    function(response) {
                        var user = JSON.parse($window.localStorage.getItem("currentUser"));
                        console.log(user);
                        if(!user) {
                            deferred.reject();
                            $window.localStorage.setItem("currentUser", null);
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
