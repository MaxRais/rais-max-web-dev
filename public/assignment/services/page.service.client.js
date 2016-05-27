/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        var numPages = 0;

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(webId, page) {
            page._id = numPages.toString();
            page.websiteId = webId;
            pages.push(page);
            numPages++;
        }

        function findPagesByWebsiteId(wid) {
            var result = [];
            for(var i in pages) {
                if(pages[i].websiteId === wid) {
                    result.push(pages[i]);
                }
            }
            return result;
        }

        function findPageById(id) {
            for(var i in pages) {
                if(pages[i]._id === id) {
                    return pages[i];
                }
            }
            return null;
        }

        function updatePage(id, newPage) {
            for(var i in pages) {
                if(pages[i]._id === id) {
                    pages[i] = newPage;
                    return true;
                }
            }
            return false;
        }

        function deletePage(id) {
            var toDelete = -1;
            for(var i in pages) {
                if(pages[i]._id === id) {
                    pages.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }

})();