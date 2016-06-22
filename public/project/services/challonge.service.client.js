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

        var process = {
            env: {
                CHALLONGE_API_KEY: "1VhaFJzxa8WKeRhK3NBt0COYJPnW1WH4mJUcubMW"
            }
        };
        
        function getTournaments() {
            var json = {
                api_key: process.env.CHALLONGE_API_KEY
            };
            var url = "https://api.challonge.com/v1/tournaments."+JSON.toString(json);
            return $http.get(url);
        }
        
        function getOneTournament(name, matches, participants) {
            var json = {
                api_key: process.env.CHALLONGE_API_KEY,
                include_participants: participants,
                include_matches: matches
            };
            var url = "https://api.challonge.com/v1/tournaments/"+name+"."+JSON.toString(json);
            return $http.get(url);
        }
        
        function createTournament(name, type, customUrl) {
            var json = {
                api_key: "1VhaFJzxa8WKeRhK3NBt0COYJPnW1WH4mJUcubMW",
                tournament : {
                    name: name,
                    tournament_type: type,
                    customUrl: customUrl ? null : customUrl
                }
            };
            var url = "https://api.challonge.com/v1/tournaments."+JSON.stringify(json);
            console.log(url);
            return $http.post(url);
        }

        function deleteTournament(name) {
            var json = {
                api_key: process.env.CHALLONGE_API_KEY
            };
            var url = "https://api.challonge.com/v1/tournaments/"+name+"."+JSON.toString(json);
            return $http.delete(url);
        }

        function startTournament(name) {
            var json = {
                api_key: process.env.CHALLONGE_API_KEY
            };
            var url = "https://api.challonge.com/v1/tournaments/"+name+"/start."+JSON.toString(json);
            return $http.post(url);
        }

        function addParticipant(tournament, username, seed) {
            var json = {
                api_key: process.env.CHALLONGE_API_KEY,
                participant: {
                    name: username,
                    seed: seed
                }
            };
            var url = "https://api.challonge.com/v1/tournaments/"+tournament+"/participants."+JSON.toString(json);
            return $http.post(url);9
        }

        function deleteParticipant(tournament, id) {
            var json = {
                api_key: process.env.CHALLONGE_API_KEY
            };
            var url = "https://api.challonge.com/v1/tournaments/"+tournament+"/participants/"+id+"."+JSON.toString(json);
            return $http.delete(url);
        }

        function getMatches(tournament, user) {
            var json = {
                api_key: process.env.CHALLONGE_API_KEY,
                participant_id: user ? user : null
            };
            var url = "https://api.challonge.com/v1/tournaments/"+tournament+"/matches."+JSON.toString(json);
            return $http.get(url);
        }

        function getOneMatch(tournament, id, attachments) {
            var json = {
                api_key: process.env.CHALLONGE_API_KEY,
                include_attatchments: attachments ? attachments : null
            };
            var url = "https://api.challonge.com/v1/tournaments/"+tournament+"/matches/"+id+"."+JSON.toString(json);
            return $http.get(url);
        }

        function updateMatch(tournament, match, winner, p1Score, p2Score) {
            var json = {
                api_key: process.env.CHALLONGE_API_KEY,
                match: {
                    scores_csv: p1Score+"-"+p2Score,
                    winner_id: winner
                }
            };
            var url = "https://api.challonge.com/v1/tournaments/"+tournament+"/matches/"+match+"."+JSON.toString(json);
            return $http.put(url);
        }
    }
})();