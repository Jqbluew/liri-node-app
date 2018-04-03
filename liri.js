
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

//require("dotenv").config();

const keys = require("./keys.js");

var spotify = require(keys.spotify); 
var twitter = require(keys.twitter);
var request = require('request');
var file = require('file-system');


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



//MOVIE INFORMATION 

lookUpMovie: (movie) => {

        var options = {
            uri: ‘http://www.omdbapi.com/',
            qs: {
                apikey: keys.omdb.key, // -> uri + ‘?access_token=xxxxx%20xxxxx’
                t: movie
            },
            headers: {
                ‘User-Agent’: ‘Request-Promise’
            },
            json: true // Automatically parses the JSON string in the response
        };

        rp(options)

        .then((body) => {
          console.log(`# Title: ${body.Title}`);
          console.log(`# Year: ${body.Released}`);
          console.log(`# IMDB Rating: ${body.Ratings[0].Value}`);
          console.log(`# Rotten Tomatoes Rating: ${body.Ratings[1].Value}`);
          console.log(`# Country: ${body.Country}`);
          console.log(`# Language: ${body.Language}`);
          console.log(`# Plot: ${body.Plot}`);
          console.log(`# Cast: ${body.Actors}`);
        })

        .catch(error => {
            console.log(‘error:’, error); // Print the error if one occurred
        });
    }

    spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(JSON.stringify(data, null, 2); 
});

//================================================================================
//Spotify 

spotifySong: (song) => {

    song = (song || "The Sign");
  console.log("Please wait while I find that song.\n");
  var spotify = new Spotify(keys.spotifyKeys);
  spotify.search({ type: 'track', query: "track:" + song, limit: 20 })
  .then(function(response) {
    var foundSong = false;
    for (var i = 0; i < response.tracks.items.length; i++) {
      if (response.tracks.items[i].name.toLowerCase() === song.toLowerCase()) {
        console.log("I think I found the song you were looking for. Here's some information on it:\n");
        if (response.tracks.items[i].artists.length > 0) {
          var artists = response.tracks.items[i].artists.length > 1 ? "  Artists: " : "  Artist: ";
          for (var j = 0; j < response.tracks.items[i].artists.length; j++) {
            artists += response.tracks.items[i].artists[j].name;
            if (j < response.tracks.items[i].artists.length - 1) {
              artists += ", ";
            }
          }
          console.log(artists);
        }
        console.log("  Song: " + response.tracks.items[i].name);
        console.log("  Album: " + response.tracks.items[i].album.name);
        console.log(response.tracks.items[i].preview_url ? "  Preview: " + response.tracks.items[i].preview_url : "  No Preview Available");

        foundSong = true;
        break;
      }
    }
    if (!foundSong) {
      console.log("I'm Sorry, I couldn't find any songs called '" + song + "' on Spotify.");
    }
  })
  .catch(function(err) {
      console.log("I'm sorry, but I seem to have run into an error.\n  " + err);
  });
};

function parseFileCommand() {
  fs.readFile("random.txt", "utf8", (error, data)=> {
    if (error) {
      return console.log("I'm sorry, but I seem to have run into an error.\n  " + error);
    }
    var dataArr = data.split(",");
    parseCommand(dataArr[0], dataArr[1].replace(/"/g, ""));
  });
};
