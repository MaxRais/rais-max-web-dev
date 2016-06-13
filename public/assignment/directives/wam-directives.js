/**
 * Created by MaxRais on 6/12/16.
 */

(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find("div")
                .sortable({
                    start: function(event, ui) {
                        console.log("sorting began");
                        startIndex = ui.item.index();
                        console.log(startIndex);
                    },
                    stop: function (event, ui) {
                        console.log("sorting stopped");
                        endIndex = ui.item.index();
                        console.log(endIndex);

                        var sortedElement = scope.data.widgets.splice(startIndex, 1)[0];
                        scope.data.widgets.splice(endIndex, 0, sortedElement);
                        console.log(scope.data);

                        scope.$apply();

                        scope.data.sorted(startIndex, endIndex);
                    },
                    axis: "y",
                    handle: ".mr-widget-tool"
                });
        }
        return {
            templateUrl: "./directives/sorted-list.html",
            scope: {
                data:   "=",
            },
            link: linker
        }
    }

})();