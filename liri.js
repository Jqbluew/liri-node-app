
/*
twitter keys
exports.twitterKeys = {
    consumer_key: 'iWC0whD6iUKWsXV27VsXDb7Yr',
    consumer_secret: 'ssT5HUqzdRskxd1zW6AFm0XHbEQrZ0xX8SfTr3mryiJpOhssXz',
    access_token_key: '879096250028765184-kU5JLXbPRLMM38V9OGAAgE4NnuFG9tu',
    access_token_secret: 'xVq81QIge8pTCLfs5zBRg9SUJ8A1AOZRBgvcc8Sfj7i4R'
};

OMDb API Key
Here is your key: 7b1384ec

Please append it to all of your API requests,

OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=7b1384ec

Spoify training for liri-node

Client ID 75939259f15f4e0e82960302d823d728
 
//     `node liri.js my-tweets`
//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.

require('dotenv').load();

if (operand === "my-tweets"){
	getTweets();
}

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'iWC0whD6iUKWsXV27VsXDb7Yr',
  consumer_secret: 'ssT5HUqzdRskxd1zW6AFm0XHbEQrZ0xX8SfTr3mryiJpOhssXz',
  access_token_key: '879096250028765184-kU5JLXbPRLMM38V9OGAAgE4NnuFG9tu',
  access_token_secret: 'xVq81QIge8pTCLfs5zBRg9SUJ8A1AOZRBgvcc8Sfj7i4R'
});


 //Stream statuses filtered by keyword
 //number of tweets per second depends on topic popularity
 
client.stream('statuses/filter', {track: 'twitter'},  function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
*/

require("dotenv").config();

const keys = require("./keys.js");

var spotify = new Spoify(keys.spotify); 
var client = new Twitter(keys.twitter);

var inputString = process.argv;
var operand = inputString[2];

var getTweets = function() {

  var params = { screen_name: 'LIRI_demo', count: 20 };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        data.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      }
      console.log(data);
    }
  });
};

//     `node liri.js my-tweets`
//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.

if (operand === "my-tweets"){
  getTweets();
}