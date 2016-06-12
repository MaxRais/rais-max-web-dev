/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }
        
        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/user/"+id;
            return $http.put(url, newUser);
        }

        function deleteUser(id) {
            var url = "/api/user/"+id;
            return $http.delete(url);
        }
    }
})();
