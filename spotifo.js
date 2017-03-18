var fs = require('fs');
var nodeSpotifyWebHelper = require('node-spotify-webhelper');
var Discord = require('discord.io');
var lasttrack = "";

try {
	config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
}catch(ex){
	console.error('config.json is missing!');
	process.exit();
}

var client = new Discord.Client({
    token: config.user.token,
    autorun: true
});

client.on('ready', function(event) {
    console.log('Logged in as %s', client.username);
});

setInterval(function(){
	
	spotify.getStatus(function (err, res) {
		
		if (err) {
			return console.error(err);
		}

		//console.log(res);

		if(res.track.track_resource.name != lasttrack){
		
			try{
				client.setPresence( {game: { name: "♫ "+ res.track.track_resource.name } } );
				console.log("New Status: " + res.track.track_resource.name)
			}catch(err){
				console.log("Could not set the new status :(");
			}
		
			lasttrack = res.track.track_resource.name;
		
		}
			
	});
	
	
	
}, 1000);

var spotify = new nodeSpotifyWebHelper.SpotifyWebHelper();