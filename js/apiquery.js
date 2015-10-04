var News = {
    //Keeps track of IDs of articles currently loaded to Home Page
    articleCache: [],
    get: function(url, query, callback) {          
            $.ajax({
            url: url,
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
    renderSnippet: function(quantity, query, callback) {
        News.get("http://content.guardianapis.com/search", query, function(data) {
        // Load snippet template to be appended
        $.get("views/home.html", function(contents) {
            // renders multiple snippets to home page
            for(var i = 0; i < quantity; i++) {
                // Cache queried articles
                var cache = {title: data[i].webTitle, body: data[i].fields.body};
                News.articleCache[i] = cache;
                // Replace tags in views with queried data
                var helper = contents;
                helper = helper.replace("${Title}", data[i].webTitle);
                helper = helper.replace("${Snippet}", data[i].fields.standfirst);
                helper = helper.replace(/\${ID}/g, i);
                // Append modified HTML string into the page
                $('div.news').append(helper);
            }
        callback();
        }, 'html');
        
        });
    },
    // Renders selected article to the page
    renderArticle: function(articleID) {
        News.clearView();
        // Load full article template
        $.get("views/article.html", function(contents) {
            // Replace tags with data from The Guardian
            var helper = contents;
            helper = helper.replace("${Title}", News.articleCache[articleID].title);
            helper = helper.replace("${Body}", News.articleCache[articleID].body);
            // Add modified article template to the page
            $('div.news').append(helper);
            // Handle going back to home page
            $('.back-home').click(function() {
                News.clearView();
                News.renderSnippet(10, "q=technology&show-fields=all&api-key=test", function() {
                // Handle "View details" click event
                $('.btn').click(function() {
                    var ID = $(this).attr('id');
                    console.log(ID);
                    console.log(News.idCache);
                    News.renderArticle(ID);
                });
            });
            });
        }, 'html');
    },
    clearView: function() {
        $('div.news').empty();
    }
}

$(document).ready(function() {
    // Initial home page rendering
    News.renderSnippet(10, "q=technology&show-fields=all&api-key=test", function() {
        // Handle "View details" click event
        $('.btn').click(function() {
            var ID = $(this).attr('id');
            console.log(ID);
            console.log(News.idCache);
            News.renderArticle(ID);
        });
    });
});