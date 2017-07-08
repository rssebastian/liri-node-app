var twitterKeys = require('./keys.js').twitterKeys;
var Twitter = require('twitter');
var client = new Twitter({
	consumer_key: twitterKeys.consumer_key,
	consumer_secret: twitterKeys.consumer_secret,
	access_token_key: twitterKeys.access_token_key,
	access_token_secret: twitterKeys.access_token_secret
	});
var tweetParams = {
	screen_name: 'dadjoke_sadjoke', 
	count: 20, 
	trim_user: true
	};

var fs = require('fs');
var Spotify = require('node-spotify-api');
var spotifyClientID = 'a4294f2afce74f5e8341bb26283114d8';
var spotifyClientSecret = '578cb9cf8b90451fac52058719ca089b';
var spotify = new Spotify({
	id: spotifyClientID,
	secret: spotifyClientSecret
});
var songTitle = "";


var request = require('request');
var movieTitle = "";

var nodeArgs = process.argv;
var liriCommandType = process.argv[2];


 if (liriCommandType === `my-tweets`) {
 	client.get('statuses/user_timeline', tweetParams, function (error, tweets, response) {
		if (error) throw error;
		for (var i=0; i < tweets.length; i++) {
			console.log("["+tweets[i].created_at+"]: " + tweets[i].text);
		};
	});
 } else if (liriCommandType === `spotify-this-song`) {
 	if (nodeArgs.length === 3) {
 		spotify
 		.search({ type: 'track', query: 'The Sign', limit: 5 })
 		.then(function(response) {
 			var songData = JSON.stringify(response, null, 2);
 			fs.writeFile('songData.txt', '', function() {
 				//console.log('emptied');
 				fs.appendFile("songData.txt", songData, function(error) {
					if (error) {
						return console.log(error)
					}
					//console.log('overwritten');
					console.log("\nArtist: " + response.tracks.items[4].artists[0].name);
					console.log("Song Name: " + response.tracks.items[4].name);
					if (response.tracks.items[4].preview_url === null) {
						console.log("Spotify Preview Link is Unavailable for this song!");
					} else {
						console.log("Spotify Preview Link: " + response.tracks.items[4].preview_url); 
					}
					console.log("Album: " + response.tracks.items[4].album.name);
				})
 			});	
  	  	})
  	  	.catch(function(err) {
    		console.log(error);
  		});
 	} else {
	 	for (var j=3; j<nodeArgs.length; j++) {
	 		songTitle = songTitle + nodeArgs[j] + " ";
	 	};
	 	//console.log(songTitle);
	 	spotify
	 		.search({ type: 'track', query: songTitle, limit: 1 })
	 		.then(function(response) {
	 			var songData = JSON.stringify(response, null, 2);
	 			fs.writeFile('songData.txt', '', function() {
	 				//console.log('emptied');
	 				fs.appendFile("songData.txt", songData, function(error) {
						if (error) {
							return console.log(error)
						}
						//console.log('overwritten');
						console.log("\nArtist: " + response.tracks.items[0].artists[0].name);
						console.log("Song Name: " + response.tracks.items[0].name);
						if (response.tracks.items[0].preview_url === null) {
							console.log("Spotify Preview Link is Unavailable for this song!");
						} else {
							console.log("Spotify Preview Link: " + response.tracks.items[0].preview_url); 
						}
						console.log("Album: " + response.tracks.items[0].album.name);
					})
	 			});	
	  	  	})
	  	  	.catch(function(err) {
	    		console.log(error);
	  		});
	}  		
 } else if (liriCommandType === `movie-this`) {
 	if (nodeArgs.length === 3) {
 		var queryUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=40e9cece";
		request(queryUrl, function(error, response, body) {
		  // If the request is successful
		  if (!error && response.statusCode === 200) {
		  	var movieData = JSON.stringify(JSON.parse(body), null, 2);
		  	fs.writeFile('movieData.txt', '', function() {
					//console.log('emptied');
				fs.appendFile("movieData.txt", movieData, function(error) {
					if (error) {
						return console.log(error)
					}
					//console.log('overwritten');
					console.log("\nMovie Title: " + movieData.Title);
					console.log("Year: " + movieData.Year);
					console.log("IMDB Rating: " + movieData.imdbRating);
					console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
					console.log("Country: " + movieData.Country);
					console.log("Language: " + movieData.Language);
					console.log("Plot: " + movieData.Plot);
					console.log("Actors: " + movieData.Actors);
				})
			});	
		   }	
		});
 	} else {
	 	for (var k=3; k<nodeArgs.length; k++) {
		 		movieTitle = movieTitle + nodeArgs[k] + " ";
		 	};
		var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece";
		request(queryUrl, function(error, response, body) {
		  // If the request is successful
		  if (!error && response.statusCode === 200) {
		  	var movieData = JSON.parse(body);
		  	var movieDataPrettified = JSON.stringify(JSON.parse(body), null, 2);
		  	fs.writeFile('movieData.txt', '', function() {
					//console.log('emptied');
				fs.appendFile("movieData.txt", movieDataPrettified, function(error) {
					if (error) {
						return console.log(error)
					}
					//console.log('overwritten');
					console.log("\nMovie Title: " + movieData.Title);
					console.log("Year: " + movieData.Year);
					console.log("IMDB Rating: " + movieData.imdbRating);
					console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
					console.log("Country: " + movieData.Country);
					console.log("Language: " + movieData.Language);
					console.log("Plot: " + movieData.Plot);
					console.log("Actors: " + movieData.Actors);
				})
			});	
		   }	
		});
	}
 } else if (liriCommandType === `do-what-it-says`) {

 };
