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

//switch-case statement for user command
function switchCase() {
	switch (userCom) {
		case 'my-tweets':
			fetchTwitter();
			break;

		case 'soptify-this-song':
			fetchSpotify();
			break;

		case 'movie-this':
			fetchMovie();
			break;

		case 'do-what-it-says':
			fetchRandom();
			break;

			default: 
			console.log("No matching arguments!");
	}
};

switchCase();

//Call twitter function
function fetchTwitter() {
	if (userCom) {
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
			for (var i = 0; i < tweets.length; i++) {
				console.log("-----------------------------")
				console.log(tweets[i].text);
				console.log("-----------------------------")
			}
		});
		var myFirstTwit = 'fake tweets'
		fs.appendFile('log.txt', myFirstTwit , function(err) {});
	}
}


//Call spotify function

function fetchSpotify() {
	if (!userInput) {
	   	var artistUndefined = "Ace of Bass";
		var songUndefined = "The Sign";
		console.log(artistUndefined);
		console.log(songUndefined);
	} else {
		var qUrl = "https://api.spotify.com/v1/search?type=" + userInput
		request(qUrl, function(error, response, body) {
    		
			if (error) {
	       		console.log('Error occurred: ' + err);
	       		return;
	   		} else {
		   			var json = JSON.parse(body);
						console.log("----------------------------------")
						console.log("artist: " + json.artist);
						console.log("Song name: " + JSON.parse(body).name);
						console.log("url: " + JSON.parse(body).url);
						console.log("Album: " + JSON.parse(body).album);
						console.log("-----------------------------------")
	   			}
	   		}
		);
		
	}
}

//Call movie function

function fetchMovie() {
	if (!userInput) {
			var movieName = "Mr. Nobody";
			console.log(movieName);
	} else {		
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
	}
	fs.appendFile('log.txt', '\n-----------------\n\n', function(err) {});
}

//Call random function

function fetchRandom() {
	var fileName = ("random.txt")
	fs.readFile(fileName, 'utf8', function(err, fileContents){
		if (err) {
			return console.log(err)
		} else {
			var textArray = fileContents.split(',');
			//userCom = array[0];
			//userInput = array [1];
			fetchSpotify(textArray[1]);

			console.log("----------------------")
			console.log(userInput);
			console.log("----------------------")
		}
	});
	fs.appendFile('log.txt', '\n-----------------\n\n', function(err) {});
}

