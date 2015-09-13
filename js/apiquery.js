var button = document.querySelector("button");

/*function renderThumbnails(startPoint, quantity, location) {
    var thumbnailOpen = '<div class="col-sm-6 col-md-4"><div class="thumbnail"><img src="..." alt="..."><div class="caption">';
    var thumbnailClose = '</div></div></div>';
    for (i = startPoint; i <= quantity; i++) {
        $('div #row').append(thumbnailOpen);
        $('div #row').append('<h3>' + json.response.results[i].webTitle + '</h3>' + '<p>' + json.response.results[i].fields.standfirst + '</p><p><a href="#" class="btn btn-default" role="button">Button</a></p>')
        $('div #row').append(thumbnailClose);
    }
}*/

$(document).ready(function() {
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
                $('.news').append('<div class="news-item"><h3>' + json.response.results[i].webTitle + '</h3><p>' + json.response.results[i].fields.standfirst + '</p><p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p></div>');
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
}, false);

