$(document).ready(function(){
	dataLoad();	
});

function dataLoad() {
	$.getJSON('../data/episodes.json', function(data) {
		var out = '';

		for (var key in data) {
			out += '<section id="'+data[key]['id']+'" class="podcast-item">';
			out += '<img src="'+data[key]['cover']+'" alt="+key+">';
			out += '<audio controls="" preload="none" class="audioPlayer"><source src="'+data[key]['audio']+'" type="audio/mpeg"></audio>'; 
			out += '<h3 id="episode-summary-from-pots">Episode summary from Pots:</h3>';
			out += '<p>'+data[key]['summary']+'</p>';
			out += '<h3 id="episode-highlights">Episode highlights:</h3>';
			out += '<p>'+data[key]['highlights']+'</p>';
			out += '<h3 id="episode-links">Episode links:</h3>';
			out += '<p>'+data[key]['links']+'</p>';		
			out += '</section>';
		}
		
		$('#podcast-page').html(out);
	});
}
