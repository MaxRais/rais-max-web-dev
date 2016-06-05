/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            createWebsite: createWebsite,
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;
        
        function createWebsite(userId, website) {
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website);
        }
        
        function findWebsitesForUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }

        function findWebsiteById(wid) {
            var url = "/api/website/"+wid;
            return $http.get(url);
        }
        
        function updateWebsite(id, newWebsite) {
            var url = "/api/website/"+id;
            return $http.put(url, newWebsite);
        }
        
        function deleteWebsite(id) {
            var url = "/api/website/"+id;
            return $http.delete(url);
        }
    }

})();