/* Magic Mirror
 * Node Helper: MMM-teamspeak3
 *
 * npm : https://www.npmjs.com/package/node-teamspeak
 * MIT Licensed.
 */
 

var NodeHelper = require("node_helper");
var TeamSpeakClient = require('node-teamspeak');
//var util = require('util');

module.exports = NodeHelper.create({
    cl: null,
    connected: null,
    consolePrefix: 'MMM-teamspeak3 : ',

    start: function function_name () {
        "use strict";
        var self = this;
        self.connected = false;
    },

    socketNotificationReceived: function(notification, payload){
        "use strict";
        var self = this;
        
        switch(notification){
            case 'TS3-INITIALIZE':
                // Retrieving config from MMM-teamspeak3.js
                this.config = payload;
                console.log(self.consolePrefix + 'Retrieving server settings');
                setInterval(function() {
                    self.getClientList();
                }, self.config.refreshInterval * 1000);
            break;
            
            case 'TS3-LOGIN':
                if(!self.connected){
                    self.logIn();    
                }
            break;
            
        }

    },
    
    logIn: function() {
        "use strict";
        var self = this;
        
        ///////////
        // Connecting to host
        console.log(self.consolePrefix + 'Connecting to Teamspeak3 server: ' + self.config.host);
        
        self.cl = new TeamSpeakClient(self.config.host, self.config.serverQueryPort);
        self.cl.on('error', (err) => {
            self.connected = false;
            self.sendSocketNotification('TS3-ERROR', err.code);
            console.error(self.consolePrefix + err);
        });
        
        console.log(self.consolePrefix + 'Login: ' + self.config.login);
        console.log(self.consolePrefix + 'Password: *****');

        // Login query to host with login/passwd
        self.cl.send("login", {client_login_name: self.config.login, client_login_password: self.config.passwd}, function(err, response, rawResponse){
            // Checking error
            if(typeof err !== 'undefined'){
                var msg = 'Connexion failed : ' + err.msg;
                console.log(self.consolePrefix + msg);
                self.connected = false;
                self.sendSocketNotification('TS3-ERROR', msg);
            }
            else{
                
                switch (true){
                    case (self.config.serverPort !== ''):
                        console.log(self.consolePrefix + 'Port: ' + self.config.serverPort);
                        self.cl.send("use", {port: self.config.serverPort}, function(err, response, rawResponse){    
                            self.connected = true;
                        });
                    break;
                    
                    case (self.config.sid !== ''):
                        console.log(self.consolePrefix + 'sid: ' + self.config.sid);
                        self.cl.send("use", {sid: self.config.sid}, function(err, response, rawResponse){    
                            self.connected = true;
                        });
                    break;
                    
                    case (self.config.serverPort === '' && self.config.sid === ''):
                        console.log(self.consolePrefix + 'Default sid used: 1');
                        self.cl.send("use", {sid: 1}, function(err, response, rawResponse){
                            self.connected = true;
                        });
                    break;
                }
            }

        });
    },

    getClientList: function() {
        "use strict";
        var self = this;

        // If successfully connected
        if(self.connected){
            // clentlist query to Teamspeak3 server
            console.log(self.consolePrefix + 'Sending clientlist query to TeamSpeak3 server');
            self.cl.send("clientlist", function(err, response, rawResponse){

                // Cleaning the client list
                var data = self.purgeClientList(response);
        
                // Empty list : nobody's connected
                if(data.length === 0){
                    self.sendSocketNotification('TS3-CLIENT-LIST-EMPTY', data);
                }
                else{
                    self.sendSocketNotification('TS3-CLIENT-LIST', data);
                }
            });
        }
        else{
            self.connected = false;
            console.log(self.consolePrefix + 'No connexion to TeamSpeak3 server, trying to reconnect');
            self.logIn();
        }
    },

    purgeClientList: function(data){
        "use strict";
        var list = [];
        var client;

        for(var i in data){
            client = data[i];

            // Ignoring serverquery clients
            if(client.client_type === 0){
                list.push(client.client_nickname);
            }
        }
        return list;
    }

 });
