var button = document.querySelector("button");
button.addEventListener("click", function(clicky) {
    $.ajax({
        url: "http://content.guardianapis.com/search",
        type: "GET",
        data: "api-key=test",
        dataType: "json",
        success: function(json) {
            $( "p" ).html("There are " + json.response.pages + " pages at the Guardian currently!");
        },
        error: function(xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        },
    });
}, false);

