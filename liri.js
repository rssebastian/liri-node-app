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

var Spotify = require('node-spotify-api');

var request = require('request');

var liriCommandType = process.argv[2];


 if (liriCommandType === `my-tweets`) {
 	client.get('statuses/user_timeline', tweetParams, function (error, tweets, response) {
		if (error) throw error;
		for (var i=0; i < tweets.length; i++) {
			console.log("["+tweets[i].created_at+"]: " + tweets[i].text);
		};
	});
	
 } else if (liriCommandType === `spotify-this-song`) {

 } else if (liriCommandType === `movie-this`) {

 } else if (liriCommandType === `do-what-it-says`) {

 };
