$(document).ready(function() {
    var defaultMain = $('body div.content').children().html();
    var emptyTemp = "";
    generateMain();
    
});


var emptyContent = function() {
    emptyTemp = $('body div.content').html();
    $('body div.content').children().remove();
}

var retreiveContent = function() {
    $('body div.content').append(emptyTemp);
}

var hideItems = function() {
    $('.row').hide();
}

var hideJumbotron = function() {
    $('.jumbotron').hide();
}

var generateMain = function() {
    $.ajax({
        url: "http://content.guardianapis.com/search",
        type: "GET",
        data: "q=technology&show-fields=all&api-key=test",
        dataType: "json",
        success: function(json) {
            // Add the latest entry
            $('#latest-headline').append(json.response.results[0].webTitle);
            $('#latest-snippet').append(json.response.results[0].fields.standfirst);

            // Content display part
            // Display content
            for (i = 1; i <= 10; i++) {
                $('.news').append('<div class="news-item"><h3 class="news-item-font">' + json.response.results[i].webTitle + '</h3><p>' + json.response.results[i].fields.standfirst + '</p><p class="push-top push-bottom"><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p></div>');
            }

            // Query for first 10 entries
            for (i = 1; i < 10; i++) {
                $('.content').append('<h2>' + json.response.results[i].webTitle + '</h2>');
                $('.content').append('<p class="snippet">' + json.response.results[i].fields.standfirst + '</p>');
            }

        },
        error: function(xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        },
    });
}

