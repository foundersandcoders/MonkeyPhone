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
            $.get("views/home.html", function(contents) {
                // renders snippets to home page
                for(var i = 0; i < quantity; i++) {
                    var cache = {title: data[i].webTitle, body: data[i].fields.body};
                    News.articleCache[i] = cache;
                    var helper = contents;
                    helper = helper.replace("${Title}", data[i].webTitle);
                    helper = helper.replace("${Snippet}", data[i].fields.standfirst);
                    helper = helper.replace("${ID}", i);
                    $('div.news').append(helper);
                }
                console.log(News.articleCache);
            callback();
            }, 'html');
            
            });
        },
        renderArticle: function(articleID, callback) {
            News.clearView();
            $.get("views/article.html", function(contents) {
                // renders snippets to home page
                var helper = contents;
                helper = helper.replace("${Title}", News.articleCache[articleID].title);
                helper = helper.replace("${Body}", News.articleCache[articleID].body);
                console.log(helper);
                $('div.news').append(helper);
                $('.back-home').click(function() {
                    News.clearView();
                    News.renderSnippet(10, "q=technology&show-fields=all&api-key=test", function() {
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
        News.renderSnippet(10, "q=technology&show-fields=all&api-key=test", function() {
            $('.btn').click(function() {
                var ID = $(this).attr('id');
                console.log(ID);
                console.log(News.idCache);
                News.renderArticle(ID);
            });
        });

        console.log(News.idCache);
    });