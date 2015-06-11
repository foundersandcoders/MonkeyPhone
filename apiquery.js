// Hey, I thought it would be fun to make a project that recommended a record
// based on the current headline, linking in with the Discogs API

var headlineButton = document.getElementById("headline-button");
headlineButton.addEventListener("click", function(clicky) {
    $.ajax({
        url: "http://content.guardianapis.com/search",
        type: "GET",
        data: "show-editors-picks=true&show-fields=headline&api-key=test",
        dataType: "json",
        success: function(json) {
            $( "#headline" ).html("The current headline is: " + json.response.results[0].webTitle);
        },
        error: function(xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        },
    });
}, false);
