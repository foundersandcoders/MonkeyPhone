$(document).ready(function() {
    var defaultMain = $('body div.content').children().html();
    var emptyTemp = "";
    var articleCache = [];
    var generateMain = function() {
        $.ajax({
            url: "http://content.guardianapis.com/search",
            type: "GET",
            data: "q=technology&show-fields=all&api-key=test",
            dataType: "json",
            success: function(json) {
                // Add the latest entry
                var articleObject = {};
                articleObject["title"] = json.response.results[0].webTitle;
                articleObject["body"] = json.response.results[0].fields.body;
                articleCache.push(articleObject);
                $('#latest-headline').append(json.response.results[0].webTitle);
                $('#latest-snippet').append(json.response.results[0].fields.standfirst);

                // Content display part
                // Display content
                var currentNewsItem = $('div.news-item').first();
                var counter = 1;
                while (counter < 10) {
                    currentNewsItem.find('h3.news-item-font').append(json.response.results[counter].webTitle);
                    currentNewsItem.find('p.news-snippet').append(json.response.results[counter].fields.standfirst);
                    currentNewsItem = currentNewsItem.next();
                    counter++;
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


// Functions to go here

});





