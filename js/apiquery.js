$(document).ready(function() {
    $.ajax({
        url: "http://content.guardianapis.com/search",
        type: "GET",
        data: "?q=technology&show-fields=all,starRating,headline,thumbnail,short-url&api-key=test",
        dataType: "json",
        success: function(json) {
            // Add the latest entry
            $('.jumbotron').css({
                'background': 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(' + json.response.results[0].fields.thumbnail + ')',
                'background-repeat': 'no-repeat, no-repeat',
                'background-size': '100%',
                'background-position': 'center'
            });
            $('#latest-headline').append(json.response.results[0].webTitle).css({'color': 'white', 'font-weight': 'bolder'});
            $('#latest-snippet').append(json.response.results[0].fields.standfirst);
            $('.push-top .btn').attr('href', json.response.results[0].webUrl);

            // Content display part
            // Display content
            for (i = 1; i <= 10; i++) {
                $('.news').append('<div class="news-item"><h3 class="news-item-font">' + json.response.results[i].webTitle + '</h3><p>' + json.response.results[i].fields.standfirst + '</p><p class="push-top push-bottom"><a class="btn btn-default" href="'+json.response.results[i].webUrl+'" role="button">View details &raquo;</a></p></div>');
            }

            // Query for first 10 entries
            for (i = 1; i < 10; i++) {
                $('.content').append('<h2>'+ json.response.results[i].webTitle + '</h2>');
                $('.content').append('<p class="snippet">' + json.response.results[i].fields.standfirst + '</p>');
            }

        },
        error: function(xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        }
    });
}, false);
