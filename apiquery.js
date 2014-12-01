var button = document.querySelector("button");
button.addEventListener("click", function(clicky) {
    $.ajax({
        url: "http://content.guardianapis.com/search",
        type: "GET",
        data: "api-key=test",
        dataType: "json",
        success: function(json) {
            $( "#response" ).html("Number of pages: " + json.response.pages);
        },
        error: function(xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        },
    });
}, false);

