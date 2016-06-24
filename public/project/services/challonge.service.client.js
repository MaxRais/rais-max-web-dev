/**
 * Created by MaxRais on 6/22/16.
 */

(function() {
    angular
        .module("ChallongeClient")
        .factory("ChallongeService", ChallongeService);

    function ChallongeService($http) {
        var api = {
            getTournaments: getTournaments,
            getOneTournament: getOneTournament,
            createTournament: createTournament,
            deleteTournament: deleteTournament,
            startTournament: startTournament,
            endTournament: endTournament,
            addParticipant: addParticipant,
            getParticipant: getParticipant,
            deleteParticipant: deleteParticipant,
            getMatches: getMatches,
            getOneMatch: getOneMatch,
            updateMatch: updateMatch
        };
        return api;
        
        function getTournaments() {
            var url = "/api/tournaments";
            return $http.get(url);
        }
        
        function getOneTournament(name, matches, participants) {
            var json = {
                include_participants: participants,
                include_matches: matches
            };
            var url = "/api/tournaments/"+name;
            return $http.get(url, json);
        }
        
        function createTournament(name, type, customUrl) {
            var json = {
                tournament: {
                    name: name,
                    tournament_type: type,
                    url: customUrl ? customUrl : null,
                    subdomain: 'brackets'
                }
            };
            var url = "/api/tournaments";
            return $http.post(url, json);
        }

        function deleteTournament(name) {
            var url = "/api/tournaments/"+name;
            return $http.delete(url);
        }

        function startTournament(name) {
            var url = "/api/tournaments/"+name+"/start";
            return $http.post(url);
        }

        function endTournament(name) {
            var url = "/api/tournaments/"+name+"/finalize";
            return $http.post(url);
        }

        function addParticipant(tournament, username, seed) {
            var json = {
                name: username,
                seed: seed
            };
            var url = "/api/tournaments/"+tournament+"/participants";
            return $http.post(url, json);
        }

        function getParticipant(tournament, pid) {
            var url = "/api/tournaments/"+tournament+"/participants/"+pid;
            return $http.get(url);
        }

        function deleteParticipant(tournament, id) {
            var url = "/api/tournaments/"+tournament+"/participants/"+id;
            return $http.delete(url);
        }

        function getMatches(tournament, user) {
            var pid = user ? user : "null";
            var url = "/api/tournaments/"+tournament+"/"+pid+"/matches";
            return $http.get(url);
        }

        function getOneMatch(tournament, id) {
            var url = "/api/tournaments/"+tournament+"/matches/"+id;
            return $http.get(url);
        }

        function updateMatch(tournament, match, winner, p1Score, p2Score) {
            var json = {
                scores_csv: p1Score+"-"+p2Score,
                winner_id: winner
            };
            var url = "/api/tournaments/"+tournament+"/matches/"+match;
            return $http.put(url, json);
        }
    }
})();