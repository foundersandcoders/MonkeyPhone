var News = {
    get: function(query, callback) {          
            $.ajax({
            url: "http://content.guardianapis.com/search",
            type: "GET",
            data: query,
            dataType: "json",
            success: function(json) {
                callback(json.response.results);     
            },
            error: function(xhr, status, errorThrown) {
                alert("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            },

        });  
    },
    renderSnippet: function(quantity, query) {
        News.get("q=technology&show-fields=all&api-key=test", function(data) {
        $.get("views/home.html", function(contents) {
            // renders snippets to home page
            for(var i = 0; i < quantity; i++) {
                var helper = contents;
                helper = helper.replace("${Title}", data[i].webTitle);
                helper = helper.replace("${Snippet}", data[i].fields.standfirst);

                $('div.news').append(helper);
            }
        }, 'html');
        console.log();
    });
    }
}


$(document).ready(function() {
    News.renderSnippet(10, "q=technology&show-fields=all&api-key=test")
   
});





