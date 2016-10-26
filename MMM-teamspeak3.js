Module.register('MMM-teamspeak3', {

	defaults: {
		host: '',
		port: '10011', // Default query port
		login: '',
		passwd: '',
		displayIcon: true,
		textSize: 'small',
		iconSize: 'xsmall',
		icon: 'fa-user',
		msgEmptyServer: 'Nobody\'s online !'
	},

	getStyles: function() {
		return ["font-awesome.css"];
	},

	start: function() {
		this.clientList = null;
		this.message = null;
		
		// Checking server configuration
		if(this.config.host == '' || this.config.login == '') {
			this.message = 'No server configuration detected';
		}
		else{
			this.message = this.translate('LOADING');

			// Connection to Teamspeak3 server
			this.sendSocketNotification('TS3-CONFIG', this.config);
			this.sendSocketNotification('TS3-LOG-IN');
		}
	},


	socketNotificationReceived: function(notification, data) {
		this.clientList = null;
		this.message = null;
		
		switch (notification){
			case 'TS3-CLIENT-LIST':
				this.clientList = data;
				this.updateDom();
			break;
			
			case 'TS3-CLIENT-LIST-EMPTY':
				this.message = this.config.msgEmptyServer;
				this.updateDom();
			break;
			
			case 'TS3-ERROR':
				switch(data){
					case 'ENOTFOUND':
						this.message = 'Unable to connect to host';
					break;
					
					case 'ECONNREFUSED':
						this.message = 'Connection refused : check host/port';
					break;
					
					case 'ECONNRESET':
						this.message = 'Connection reset by peer';
					break;
					
					case 'ETIMEDOUT':
						this.message = 'Connection timed out';
					break;
					
					default:
						this.message = 'An error occured, please check logs';
					break;
				}
				this.message += ' (code: ' + data + ')';
				this.updateDom();
			break;	
		}	
	},


	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

		// Display message/error if set
		// else -> client list
		if(this.message){
			wrapper.className = 'dimmed light small';
			wrapper.innerHTML = this.message;
			return wrapper;
		}

		var table = document.createElement("table");
		wrapper.appendChild(table);
		
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
				icon.className = "fa " + this.config.icon;
				iconCell.appendChild(icon);
			}

		}
		return wrapper;

	},

});
