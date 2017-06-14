//console.log("link test");

var fs = require('fs');

var Twitter = require('twitter');
var keys = require('./keys.js');
var client = new Twitter(keys);

var spotify = require('spotify');
var request = require('request');

//Two arguments, first one is user command and second agr is user search to pick the choice.
var userCom = process.argv[2];
var userInput = process.argv[3];

//User commands: 'my-tweets', 'soptify-this-song', 'movie-this', 'do-what-it-says'.
//User searches:'<song name>', '<movie name>'


//twitter done
/*
var params = {
	q: 'nurulcode',
	count: 2
}

//search two tweets from nurulcode user

client.get('search/tweets', params, function(error, data, response) {
	//console.log(data);
	if (error) {
		return console.log(error);
	}
	var tweets = data.statuses;
	for (var i =0; i < tweets.length; i++) {
		console.log(tweets[i].text);
	}
});
*/
var spotify = require('spotify');

request('https://api.spotify.com/v1/tracks/search' + userInput, function(error, response, body) {
	var json = JSON.parse(body);

	console.log("artist: " + json.artist);
	console.log("Song name: " + JSON.parse(body).name);
	console.log("url: " + JSON.parse(body).url);
	console.log("Album: " + JSON.parse(body).album);

  });


//spotify this song
/*
var spotify = require('spotify');
var trackName = '';
 
spotify.search({ type: 'track', query: trackName }, function(err, response, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	

    // Do something with 'data' 
    //var data = tracks.items.track;
    //console.log(response);

    var songs = data.tracks.items.track.album.name;
    console.log(songs);
    	/*
	    for(var i = 0; i < songs.length; i++){
	    	console.log('artist(s): ' + songs[i].artists.name);
	    	console.log('song name: ' + songs[i].name);
	    	console.log('preview song: ' + songs[i].preview_url);
	    	console.log('album: ' + songs[i].album.name);
	    	console.log('-----------------------------------');
	    } 
});
*/

/*
//var movieName = '';
var requestUrl = "http://www.omdbapi.com/?t=" + userInput + "&apikey=40e9cece";

request(requestUrl, function(error, response, body) {
	if (error) {
		return console.log(error);
	}

	const json = JSON.parse(body);

			console.log("---------------------------------------------");
			console.log("\nMy Movie: ");
	   		console.log("\nTitle: " + json.Title);
	   		console.log("Year: " + json.Year);
	   		console.log("Rated: " + json.imdbRating);
	   		console.log("Country: " + json.Country);
	   		console.log("Language: " + json.Language);
	   		console.log("Plot: " + json.Plot);
	   		console.log("Actors: " + json.Actors);
	   		console.log("Rotten Tomatoes: " + json.Value);
	   		console.log("URL: https://www.rottentomatoes.com/search/?search=" + userInput);
			console.log("-----------------------------------------------");
});

//var file = require('./random.txt')
var fileName = ("random.txt")
fs.readFile(fileName, 'utf8', function(err, fileContents){
		if (err) {
			return console.log(err)
		} else {
			console.log(fileContents);
			//var array = data.split(',');

			//userCom = array[0];
			//userSearch = array [1];

			//switchCase();
		}
	});

*/
