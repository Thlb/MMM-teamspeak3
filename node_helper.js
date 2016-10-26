var NodeHelper = require("node_helper");
var TeamSpeakClient = require('node-teamspeak');
//var util = require('util');


module.exports = NodeHelper.create({
	cl: null,
	connected: false,

	start: function function_name () {
		var self = this;
		setInterval(function() {
			self.getClientList();
		}, 10000);
	},

	socketNotificationReceived: function(notification, payload){
		var self = this;

		// Retrieving config from MMM-teamspeak3.js
		if(notification === 'TS3-CONFIG'){
			this.config = payload;
			console.log('Retrieving server settings');
		}

		// Connexion to TeamSpeak3 server
		if(notification === 'TS3-LOG-IN'){
			// Host
			console.log('Connecting to Teamspeak3 server: ' + self.config.host);
			
			self.cl = new TeamSpeakClient(self.config.host, self.config.port);
			self.cl.on('error', (err) => {
				self.sendSocketNotification('TS3-ERROR', err.code);
			 	console.error(err);
			});
			
			console.log('Login: ' + self.config.login);
			console.log('Password: *****');

			// Login query to host with login/passwd
			self.cl.send("login", {client_login_name: self.config.login, client_login_password: self.config.passwd}, function(err, response, rawResponse){
				// Checking error
				if(typeof err !== 'undefined'){
					var msg = 'Connexion failed : ' + err.msg;
					console.log(msg);
					self.connected = false;
					self.sendSocketNotification('TS3-ERROR', msg);
				}
				else{
					self.cl.send("use", {sid: 1}, function(err, response, rawResponse){
						self.connected = true;
					});
				}

			});

		}
	},

	getClientList: function() {
		var self = this;

		// If successfully connected
		if(self.connected){
			// clentlist query to Teamspeak3 server
			console.log('Sending clientlist query to TeamSpeak3 server');
			self.cl.send("clientlist", function(err, response, rawResponse){
				var clist;

				// Cleaning the client list
				clist = self.purgeClientList(response);
		
				// Empty list : nobody's connected
				if(clist.length == 0){
					self.sendSocketNotification('TS3-CLIENT-LIST-EMPTY', clist);
				}
				else{
					self.sendSocketNotification('TS3-CLIENT-LIST', clist);
				}
			});
		}
		else{
			console.log('No connexion to TeamSpeak3 server, ignoring clientlist query');
		}
	},

	purgeClientList: function(clist){
		var list = [];
		var client;
		var data;

		for(var i in clist){
			client = clist[i];

			// Ignoring serverquery clients
			if(client.client_type == 0){
				list.push(client.client_nickname);
			}
		}
		//console.log(util.inspect(list));
		return list;
	}

 });
