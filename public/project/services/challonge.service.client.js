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
            addParticipant: addParticipant,
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
                name: name,
                tournamentType: type,
                url: customUrl ? customUrl : null,
                subdomain: 'brackets'
            };

            /*json = {
                api_key: 'u4oHiWqAGVWTnWRkrclDufRswZirQlj88qvKsosl',
                tournament: {
                    name: name,
                    tournament_type: type,
                    url: customUrl ? customUrl : null,
                    subdomain: 'brackets'
                }
            };*/
            var url = "/api/tournaments";
            //url = "api.challonge.com/v1/tournaments.json?"+JSON.stringify(json);
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

        function addParticipant(tournament, username, seed) {
            var json = {
                name: username,
                seed: seed
            };
            var url = "/api/tournaments/"+tournament+"/participants";
            return $http.post(url, json);
        }

        function deleteParticipant(tournament, id) {
            var url = "/api/tournaments/"+tournament+"/participants/"+id;
            return $http.delete(url);
        }

        function getMatches(tournament, user) {
            var json = {
                participant_id: user ? user : null
            };
            var url = "/api/tournaments/"+tournament+"/matches";
            return $http.get(url, json);
        }

        function getOneMatch(tournament, id, attachments) {
            var json = {
                include_attatchments: attachments ? attachments : null
            };
            var url = "/api/tournaments/"+tournament+"/matches/"+id;
            return $http.get(url, json);
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