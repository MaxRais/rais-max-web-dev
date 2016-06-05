/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(webId, page) {
            var url = "/api/website/"+webId+"/page";
            return $http.post(url, page);
        }

        function findPagesByWebsiteId(wid) {
            var url = "/api/website/"+wid+"/page";
            return $http.get(url);
        }

        function findPageById(id) {
            var url = "/api/page/"+id;
            return $http.get(url);
        }

        function updatePage(id, newPage) {
            var url = "/api/page/"+id;
            return $http.put(url, newPage);
        }

        function deletePage(id) {
            var url = "/api/page/"+id;
            return $http.delete(url);
        }
    }

})();