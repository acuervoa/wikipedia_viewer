$(document).ready(function(){

	var sendQuery = function(queryData){
		var wikipediaAPIURL = "https://es.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=&generator=search&utf8=1&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrnamespace=0&gsrlimit=10&gsrsearch=";

		$.ajax( {
    		url: wikipediaAPIURL + queryData,
    		dataType: 'jsonp',
    		type: 'GET',
    		headers: { 'Api-User-Agent': 'Example/1.0' },
    		success: function(data) {
       			printResults(data);
    		}
		});

	};

	var printResults = function(results){

		console.log(results)
		$("#results").append("<ul class='list'>");
		$.each(results.query.pages, function(key, value){
			console.log(value.title);
			console.log(value.extract);
			console.log(value.pageid);
			$(".list").append("<li>").append("<div class='individualResult" + key + "'>");
			$(".individualResult" + key).append(value.title);
			$(".list").append("</div>").append("</li>");
		});
		$("#results").append("</ul>");
	};


	$('#btnSubmit').on('click', function(e){
		e.preventDefault();
		
		sendQuery($('#searchBox').val());
	});

});