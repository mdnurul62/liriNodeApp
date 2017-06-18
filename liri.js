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


//Call twitter function
var getMyTweets = function() {
	if (userCom) {
		var params = {q: 'nurulcode', count: 2};

		//search two tweets from nurulcode user

		client.get('search/tweets', params, function(error, data, response) {
			//console.log(data);
			if (error) {
				return console.log(error);
			}
			var tweets = data.statuses;
			for (var i = 0; i < tweets.length; i++) {
				console.log("-----------------------------");
				console.log(tweets[i].created_at);
				console.log(tweets[i].text);
				console.log("-----------------------------");
			}
		});
		var myFirstTweet = 'fake tweets'
		fs.appendFile('log.txt', myFirstTweet, function(err) {});
	}
}


//Call spotify function
var getArtistNames = function(artist) {
	return artist.name;
}

var getMeSpotify = function(songName) {
	spotify.search({type: 'track', query: songName}, function(err, data) {
		if (err) {
			console.log('Error occurred' + err);
			return;
		}

		var songs = data.tracks.items;
		for (var i = 0; i < songs.length; i++) {
			console.log("----------------------------------");
			console.log(i);
			console.log("artist: " + songs[i].artists.map(getArtistNames));
			console.log("Song name: " + songs[i].name);
			console.log("preview song: " + songs[i].preview_url);
			console.log("Album: " + songs[i].album.name);
			console.log("-----------------------------------")

		}
	});
}

	

//Call movie function

var getMeMovie = function(movieName) {
	if (!userInput) {
			console.log("Mr. Nobody");
	} 

	else {		
		var requestUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=40e9cece";

		request(requestUrl, function(error, response, body) {
			if (!error && response.statusCode === 200) {

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
		   		console.log("Rotten tomatoes URL" + json.tomatoURL);
				console.log("-----------------------------------------------");
			}
		});
	}
}

//Call random function

var doWhatItSays = function() {
	fs.readFile('random.txt', 'utf8', function(err, fileContents){
		if (err) {
			return console.log(err)
		} else {
			var textArray = fileContents.split(', ');
			getMeSpotify(textArray[1]);
			console.log(textArray);

		}
		
	});
	fs.appendFile('log.txt', '\n--------------------\n\n', function(err) {});
}

//switch-case statement for user command
var pick = function(caseData, functionData) {
	switch (caseData) {
		case 'my-tweets':
			getMyTweets();
			break;

		case 'soptify-this-song':
			getMeSpotify(functionData);
			break;

		case 'movie-this':
			getMeMovie(functionData);
			break;

		case 'do-what-it-says':
			doWhatItSays();
			break;

			default: 
			console.log("No matching arguments!");
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(userCom, userInput);


