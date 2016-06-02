/**
 * Created by MaxRais on 5/25/16.
 */


(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "6500907f1f514de4efcd9b9234e0e698";
    var secret = "3b46146553b77889";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT&callback=JSON_CALLBACK";

    function FlickrService($http) {

        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();