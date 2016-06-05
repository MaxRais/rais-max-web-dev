/**
 * Created by MaxRais on 5/26/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController(WidgetService, FlickrService, $routeParams, $location) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;
        var wgid = $routeParams.wgid;

        vm.uid = uid;
        vm.wid = wid;
        vm.pid = pid;
        vm.wgid = wgid;

        WidgetService
            .findWidgetById(wgid)
            .then(
                function(response) {
                    var widget = response.data;
                    if(widget) {
                        vm.widget = angular.copy(widget);
                    }
                }
            );

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function (response) {
                        data = response.data.replace("jsonFlickrApi(", "");
                        data = data.substring(0, data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.widget.url = url;
            WidgetService
                .updateWidget(wgid, vm.widget)
                .then(
                    function (response) {
                        $location.url("/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+wgid);
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();

