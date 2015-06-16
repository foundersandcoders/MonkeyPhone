// Hey, I thought it would be fun to make a project that recommended a record
// based on the current headline, linking in with the Discogs API
// The idea is that it searches the Discogs Marketplace using the first word of the
// headline and returns the first result

// STILL TO DO: Discogs auth to make that bit work. Also need to make a more
// sophisticated way of choosing a record than just first word of headline

var headlineButton = document.getElementById("headline-button");
var headlineText = "";
var firstWord = "";
var resultRecord = "";
headlineButton.addEventListener("click", function(clicky) {
    $.ajax({
        url: "http://content.guardianapis.com/search",
        type: "GET",
        data: "show-editors-picks=true&show-fields=headline&api-key=test",
        dataType: "json",
        success: function(json) {
            headlineText += json.response.results[0].webTitle;
            firstWord += headlineText.split(" ")[0];
            $( "#headline" ).html("The current headline is: " + headlineText);
            $( "#firstWord" ).html("The first word is: " + firstWord);
        },
        error: function(xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        },
    });
}, false);

var recordButton = document.getElementById("record-button");
recordButton.addEventListener("click", function(clicky) {
    $.ajax({
        headers: {key: 'qmCvXianinPlRUtHulBD', secret: 'THJwLdwqivKetxWTpHMecjebOMPpyysT'},
        url: "https://api.discogs.com/database/search",
        type: "GET",
        data: "type=release&artist=" + firstWord,
        dataType: "json",
        success: function(json) {
            resultRecord += json.response.results[0].title;
            $( "#record").html("You should buy: " + resultRecord);
        },
        error: function(xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        },
    });
}, false);

        
