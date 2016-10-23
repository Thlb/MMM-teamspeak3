Module.register('MMM-teamspeak3', {

	defaults: {
		host: '',
		login: '',
		passwd: '',
		displayIcon: true,
		textSize: 'small',
		iconSize: 'xsmall'

	},

	getStyles: function() {
		return ["font-awesome.css"];
	},

	start: function() {
		// Checking server configuration
	    if(this.config.host == '' || this.config.login == '') {
			this.clientList = 'No server configuration detected';
		}
		else{
			this.clientList = 'Loading...';

			// Connexion to Teamspeak3 server
			this.sendSocketNotification('CONFIG', this.config);
			this.sendSocketNotification('LOGIN');
		}
	},


	socketNotificationReceived: function(notification, clist) {
		if (notification === 'TS3CLIENTLIST') {
			this.clientList = clist;
			this.updateDom();
		}
	},


	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

		// Checking client list :
		// if not array -> error message
		// else -> client list
		if(!Array.isArray(this.clientList)){
			wrapper.className = 'align-right small';
			wrapper.innerHTML = this.clientList;
			return wrapper;
		}

		var table = document.createElement("table");

		for(var c in this.clientList){
			var client = this.clientList[c];

			var row = document.createElement('tr');
			table.appendChild(row);

			var clientCell = document.createElement("td");
			clientCell.className = "align-right bright " + this.config.textSize;
			clientCell.innerHTML = client;
			row.appendChild(clientCell);

			if(this.config.displayIcon){
				var iconCell = document.createElement("td");
				iconCell.className = this.config.iconSize;
				row.appendChild(iconCell);

				var icon = document.createElement("span");
				icon.className = "fa fa-user";
				iconCell.appendChild(icon);
			}

		}
		return table;

	},

});
