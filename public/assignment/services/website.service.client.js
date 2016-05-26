/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

        var numWebsites = 0;

        var api = {
            createWebsite: createWebsite,
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;
        
        function createWebsite(userId, website) {
            website._id = numWebsites.toString();
            website.developerId = userId;
            websites.push(website);
            numWebsites++;
        }
        
        function findWebsitesForUser(userId) {
            var result = [];
            for(var i in websites) {
                if(websites[i].developerId === userId) {
                    result.push(websites[i]);
                }
            }
            return result;
        }

        function findWebsiteById(wid) {
            for(var i in websites) {
                if(websites[i]._id === wid) {
                    return websites[i];
                }
            }
            return null;
        }
        
        function updateWebsite(id, newWebsite) {
            for(var i in websites) {
                if(websites[i]._id === id) {
                    websites[i] = newWebsite;
                    return true;
                }
            }
            return false;
        }
        
        function deleteWebsite(id) {
            var toDelete = -1;
            for(var i in websites) {
                if(websites[i]._id === id) {
                    websites.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }

})();