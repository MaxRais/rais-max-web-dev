/**
 * Created by MaxRais on 6/21/16.
 */

module.exports = function (app) {
    var challonge = require('challonge');
    var https = require('https');
    var qs = require('querystring');
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    var client = challonge.createClient({
        apiKey: process.env.CHALLONGE_API_KEY,
        subdomain: 'brackets',
        format: 'json',
        version: 1
    });

    app.get("/api/tournaments", getTournaments); //Get all tournaments
    app.get("/api/tournaments/:name", getOneTournament); //Show one tournament
    app.post("/api/tournaments", createTournament); //Create tournament
    app.delete("/api/tournaments/:name", deleteTournament); //Delete tournament
    app.post("/api/tournaments/:name/start", startTournament); //Start tournament
    app.post("/api/tournaments/:name/participants", addParticipant); //Create participant
    app.get("/api/tournaments/:name/participants/:pid", getParticipant); //Get participant
    app.delete("/api/tournaments/:name/participants/:pid", deleteParticipant); //Delete participant
    app.get("/api/tournaments/:name/:pid/matches/", getMatches); //Get all matches in a tournament
    app.get("/api/tournaments/:name/matches/:mid", getOneMatch); //Get one match record
    app.put("/api/tournaments/:name/matches/:mid", updateMatch); //Update match

    function getTournaments(req, res) {
        client.tournaments.index({
            callback: function(err, data){
                if (err) { res.send(err); return; }
                res.json(data);
            }
        });
    }

    function getOneTournament(req, res) {
        var name = req.params["name"];
        var participants = req.body.include_participants;
        var matches = req.body.include_matches;
        client.tournaments.show({
            id: name,
            includeParticipants: participants,
            includeMatches: matches,
            callback: function(err, data){
                if (err) { res.send(err); return; }
                res.json(data);
            }
        });
    }

    function createTournament(req, res) {
        var tournament = req.body.tournament;
        var url = "api.challonge.com";
        var path = "/v1/tournaments.json?";
        path+="api_key="+process.env.CHALLONGE_API_KEY;
        path+="&tournament[name]="+tournament.name.replaceAll(' ', '+');
        path+="&tournament[tournament_type]="+tournament.tournament_type.replace(' ', '+');
        path+="&tournament[url]="+tournament.url;
        path+="&tournament[subdomain]="+tournament.subdomain;

        var options = {
            hostname: url,
            path: path,
            method: 'POST'
        };

        var requ = https.request(options, function(resp){
            var resData = '';
            resp.on('data', function(chunk) {
                resData += chunk;
            });

            resp.on('end', function() {
                resData = JSON.parse(resData);
                res.json(resData);
            });
        });
        requ.end();
    }

    function deleteTournament(req, res) {
        var name = req.params["name"];
        var url = "api.challonge.com";
        var path = "/v1/tournaments/brackets-"+name+".json?";
        path+="api_key="+process.env.CHALLONGE_API_KEY;

        var options = {
            hostname: url,
            path: path,
            method: 'DELETE'
        };

        var requ = https.request(options, function(resp){
            var resData = '';
            resp.on('data', function(chunk) {
                resData += chunk;
            });

            resp.on('end', function() {
                resData = JSON.parse(resData);
                res.json(resData);
            });
        });
        requ.end();
    }

    function startTournament(req, res) {
        var name = req.params["name"];
        var url = "api.challonge.com";
        var path = "/v1/tournaments/brackets-"+name+"/start.json?";
        path+="api_key="+process.env.CHALLONGE_API_KEY;

        var options = {
            hostname: url,
            path: path,
            method: 'POST'
        };

        var requ = https.request(options, function(resp){
            var resData = '';
            resp.on('data', function(chunk) {
                resData += chunk;
            });

            resp.on('end', function() {
                resData = JSON.parse(resData);
                res.json(resData);
            });
        });
        requ.end();
    }

    function addParticipant(req, res) {
        var name = req.params["name"];
        var participant = req.body;
        var url = "api.challonge.com";
        var path = "/v1/tournaments/brackets-"+name+"/participants.json?";
        path+="api_key="+process.env.CHALLONGE_API_KEY;
        path+="&participant[name]="+participant.name;
        path+="&participant[seed]="+participant.seed;

        var options = {
            hostname: url,
            path: path,
            method: 'POST'
        };

        var requ = https.request(options, function(resp){
            var resData = '';
            resp.on('data', function(chunk) {
                resData += chunk;
            });

            resp.on('end', function() {
                resData = JSON.parse(resData);
                res.json(resData);
            });
        });
        requ.end();
    }

    function getParticipant(req, res) {
        var tourney = req.params["name"];
        var pid = req.params["pid"];

        var url = "api.challonge.com";
        var path = "/v1/tournaments/brackets-"+tourney+"/participants/"+pid+".json?";
        path+="api_key="+process.env.CHALLONGE_API_KEY;

        var options = {
            hostname: url,
            path: path,
            method: 'GET'
        };

        var requ = https.request(options, function(resp) {
            var resData = '';
            resp.on('data', function(chunk) {
                resData += chunk;
            });

            resp.on('end', function() {
                resData = JSON.parse(resData);
                res.json(resData);
            });
        });
        requ.end();
    }

    function deleteParticipant(req, res) {
        var tourney = req.params["name"];
        var pid = req.params["pid"];

        var url = "api.challonge.com";
        var path = "/v1/tournaments/brackets-"+tourney+"/participants/"+pid+".json?";
        path+="api_key="+process.env.CHALLONGE_API_KEY;

        var options = {
            hostname: url,
            path: path,
            method: 'DELETE'
        };

        var requ = https.request(options, function(resp){
            var resData = '';
            resp.on('data', function(chunk) {
                resData += chunk;
            });

            resp.on('end', function() {
                resData = JSON.parse(resData);
                res.json(resData);
            });
        });
        requ.end();
    }

    function getMatches(req, res) {
        var name = req.params["name"];
        var pid = req.params["pid"];

        var url = "api.challonge.com";
        var path = "/v1/tournaments/brackets-"+name+"/matches.json?";
        path+="api_key="+process.env.CHALLONGE_API_KEY;
        if(pid!="null") path+="&participant_id="+pid;

        var options = {
            hostname: url,
            path: path,
            method: 'GET'
        };

        var requ = https.request(options, function(resp){
            var resData = '';
            resp.on('data', function(chunk) {
                resData += chunk;
            });

            resp.on('end', function() {
                resData = JSON.parse(resData);
                res.json(resData);
            });
        });
        requ.end();
    }

    function getOneMatch(req, res) {
        var name = req.params["name"];
        var mid = req.params["mid"];

        var url = "api.challonge.com";
        var path = "/v1/tournaments/brackets-"+name+"/matches/"+mid+".json?";
        path+="api_key="+process.env.CHALLONGE_API_KEY;

        var options = {
            hostname: url,
            path: path,
            method: 'GET'
        };

        var requ = https.request(options, function(resp){
            var resData = '';
            resp.on('data', function(chunk) {
                resData += chunk;
            });

            resp.on('end', function() {
                resData = JSON.parse(resData);
                res.json(resData);
            });
        });
        requ.end();
    }

    function updateMatch(req, res) {
        var name = req.params["name"];
        var mid = req.params["mid"];
        var match = req.body;

        var url = "api.challonge.com";
        var path = "/v1/tournaments/brackets-"+name+"/matches/"+mid+".json?";
        path+="api_key="+process.env.CHALLONGE_API_KEY;
        path+="&match[scores_csv]="+match.scores_csv;
        path+="&match[winner_id]="+match.winner_id;

        var options = {
            hostname: url,
            path: path,
            method: 'PUT'
        };

        var requ = https.request(options, function(resp){
            var resData = '';
            resp.on('data', function(chunk) {
                resData += chunk;
            });

            resp.on('end', function() {
                resData = JSON.parse(resData);
                res.json(resData);
            });
        });
        requ.end();
    }

};