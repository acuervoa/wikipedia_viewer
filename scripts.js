$(document).ready(function() {

    var sendQuery = function(queryData) {
        var wikipediaAPIURL = "https://es.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=&generator=search&utf8=1&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrnamespace=0&gsrlimit=10&gsrsearch=";

        $.ajax({
            url: wikipediaAPIURL + queryData,
            dataType: 'jsonp',
            type: 'GET',
            headers: { 'Api-User-Agent': 'Example/1.0' },
            success: function(data) {
                printResults(data);
            }
        });

    };

    var printResults = function(results) {

        $('#results').hide();
        $("#results").append("<ul class='list'>");
        if (typeof results.query !== 'undefined') {
            $.each(results.query.pages, function(key, value) {
                $(".list").append("<li>").append("<div class='individualResult' id='result" + value.pageid + "'>");
                $("#result" + key).append("<h1>" + value.title + "</h1>");
                $("#result" + key).append("<p>" + value.extract + "</p>");
                $("#result" + key).append("<a href='http://es.wikipedia.org/?curid=" + value.pageid + "' target='_blank'>see more</a>");
                $(".list").append("</div>").append("</li>");
            });
        } else {
            $(".list").append("<li>").append("<div class='individualResult'>Results not found. Try again!</div>");
        }
        $("#results").append("</ul>");

        $('#results').fadeIn();
    };


    $('#btnSubmit').on('click', function(e) {
        e.preventDefault();
        $('#results').html('');
        sendQuery($('#searchBox').val());

    });

});
