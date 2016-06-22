/**
 * Created by MaxRais on 6/21/16.
 */

module.exports = function (app) {
    //app.post("/api/user", createUser);

    //Get all tournaments
    //GET https://api.challonge.com/v1/tournaments.{json|xml}

    //Show one tournament
    //GET https://api.challonge.com/v1/tournaments/{tournament}.{json|xml}
    // Ex/Include matches, Ex/Include participants

    //Create tournament
    //POST https://api.challonge.com/v1/tournaments.{json|xml}
    // Name, (Custom URL?), Type (SE, DE, Swiss, RR)

    //Delete tournament
    //DELETE https://api.challonge.com/v1/tournaments/{tournament}.{json|xml}

    //Start tournament
    //POST https://api.challonge.com/v1/tournaments/{tournament}/start.{json|xml}

    //Create participant
    //POST https://api.challonge.com/v1/tournaments/{tournament}/participants.{json|xml}
    //Name, (username?), (seed?)

    //Delete participant
    //DELETE Help https://api.challonge.com/v1/tournaments/{tournament}/participants/{participant_id}.{json|xml}

    //Get all matches in a tournament
    //GET https://api.challonge.com/v1/tournaments/{tournament}/matches.{json|xml}
    //participant_id

    //Get one match record
    //GET https://api.challonge.com/v1/tournaments/{tournament}/matches/{match_id}.{json|xml}
    //show_attachments boolean

    //Update match
    //PUT https://api.challonge.com/v1/tournaments/{tournament}/matches/{match_id}.{json|xml}
    //Winner_id, p1Score, p2Score
};