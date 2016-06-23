/**
 * Created by MaxRais on 6/21/16.
 */

module.exports = function (app) {
    var challonge = require('challonge');

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
    app.delete("/api/tournaments/:name/participants/:pid", deleteParticipant); //Delete participant
    app.get("/api/tournaments/:name/matches", getMatches); //Get all matches in a tournament
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
        name.replace('%20', ' ');
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
        var newTournament = req.body;
        console.log(newTournament);
        client.tournaments.create({
            tournament: newTournament,
            callback: function(err,data){
                if (err) { res.send(err); return; }
                res.json(data);
            }
        });
    }

    function deleteTournament(req, res) {
        var name = req.params["name"];
        client.tournaments.destroy({
            id: name,
            callback: function(err, data){
                if (err) { res.send(err); return; }
                res.json(data);
            }
        });
    }

    function startTournament(req, res) {
        var name = req.params["name"];
        client.tournaments.start({
            id: name,
            callback: function(err, data){
                if (err) { res.send(err); return; }
                res.json(data);
            }
        });
    }

    function addParticipant(req, res) {
        var name = req.params["name"];
        var participant = req.body;
        client.participants.create({
            id: name,
            participant: participant,
            callback: function(err, data){
                if (err) { res.send(err); return; }
                res.json(data);
            }
        });
    }

    function deleteParticipant(req, res) {
        var tourney = req.params["name"];
        var pid = req.params["pid"];
        client.participants.destroy({
            id: tourney,
            participantId: pid,
            callback: function(err,data){
                if (err) { res.send(err); return; }
                res.json(data);
            }
        });
    }

    function getMatches(req, res) {
        var name = req.params["name"];
        client.matches.index({
            id: name,
            callback: function(err,data){
                if (err) { res.send(err); return; }
                res.json(data);
            }
        });
    }

    function getOneMatch(req, res) {
        var name = req.params["name"];
        var mid = req.params["mid"];
        client.matches.show({
            id: name,
            matchId: mid,
            callback: function(err,data){
                if (err) { res.send(err); return; }
                res.json(data);
            }
        });
    }

    function updateMatch(req, res) {
        var name = req.params["name"];
        var mid = req.params["mid"];
        var match = req.body;
        client.matches.update({
            id: name,
            matchId: mid,
            match: match,
            callback: function(err,data){
                if (err) { res.send(err); return; }
                res.json(data);
            }
        });
    }

};