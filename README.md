# Module: MMM-teamspeak3
This [MagicMirror](https://github.com/MichMich/MagicMirror) module, display client list of a Teamspeak3 server.

![TeamSpeak3 visualisation](https://github.com/Thlb/MMM-teamspeak3/blob/gh-pages/.github/screenshot-01-min.png)

## Dependencies
- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
- A Teamspeak ServerQuery user
- [node-teamspeak](https://www.npmjs.com/package/node-teamspeak)

## Installation

Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/Thlb0/MMM-teamspeak3
```

Navigate to the new `MMM-teamspeak3` folder and install the node dependencies.
```
npm install
```

Configure the module in your `config.js` file.

## Create a TeamSpeak ServerQuery login
- Open TeamSpeak3
- At the top of the TeamSpeak 3 program, click the "Tools" menu then click the "ServerQuery Login" option. 
- Type in the server query username you wish to create. Copy and paste the information that is generated for you to login with.  


[TeamSpeak support tutorial](http://www.teamspeak3.com/support/teamspeak-3-add-server-query-user.php)


## Using the module

To use this module, add it to the modules array in the `config/config.js` file. 

<b>Note : </b> If you rent the TeamSpeak server, you probably need to specify the <code>serverPort</code> or <code>sid</code> 

```javascript
modules: [
  {
    module: 'MMM-teamspeak3',
    position: 'top_right',
    header: 'My TeamSpeak3 server',
    config: {
      host: 'my.teamspeakhost.com',
      serverPort: '9987', // Default server port (not required if default port (9987) is used)
      sid: '', // Server ID 
      serverQueryPort: '10011', // Default server query port (not required if default port (10011) is used)
      login: 'queryuser',
      passwd: 'password',
      refreshInterval: 10 // in seconds
    }
  },
]
```

## Configuration options

The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>

		<tr>
			<td><code>host</code></td>
			<td>Hostname/IP of the Teamspeak Server.  
				<br>
				<br>
				<b>Required</b>
				<br>
				<b>Possible values:</b> <code>localhost</code>, <code>url</code> or a IP
				<br>
				<b>Default value:</b> <code>null</code>
			</td>
		</tr>
		
		<tr>
			<td><code>serverPort</code></td>
			<td>Port of the Teamspeak Server.  
				<br>
				<br>
				<br>
				<b>Default value:</b> <code> 9987 </code> (Default TeamSpeak3 voice port)
			</td>
		</tr>
		<tr>
			<td><code>sid</code></td>
			<td>ID of the Teamspeak Server.  
				<br>
				<br>
				<br>
				<b>Default value:</b> <code>''</code> 			</td>
		</tr>
		<tr>
			<td><code> serverQueryPort </code></td>
			<td>Port of the Teamspeak Server.  
				<br>
				<br>
				<br>
				<b>Default value:</b> <code>10011</code> (Default TeamSpeak3 query port)
			</td>
		</tr>
		<tr>
			<td><code>login</code></td>
			<td>Teamspeak ServerQuery login.  
				<br>
				<br>
				<b>Required</b>
				<br>
				<b>Default value:</b> <code>null</code>
			</td>
		</tr>

		<tr>
			<td><code>passwd</code></td>
			<td>Teamspeak ServerQuery password.  
				<br>
				<br>
				<b>Required</b>
				<br>
				<b>Default value:</b> <code>null</code>
			</td>
		</tr>
   		<tr>
			<td><code>refreshInterval</code></td>
			<td>The refresh interval of queries (in seconds).
				<br>
				<br>
				<b>Default value:</b> <code>10</code>
			</td>
		</tr>
		<tr>
			<td><code>displayIcon</code></td>
			<td>Display FontAwesome user icon
				<br>
				<br>
				<b>Possible values:</b> <code>true</code> or <code>false</code>
				<br>
				<b>Default value:</b> <code>true</code>
			</td>
		</tr>
    
		<tr>
			<td><code>iconSize</code></td>
			<td>Size of FontAwesome user icon
				<br>
				<br>
				<b>Possible values:</b> <code>xsmall</code>, <code>small</code>, <code>medium</code>, <code>large</code>, <code>xlarge</code>
				<br>
				<b>Default value:</b> <code>small</code>
			</td>
		</tr>
    
		<tr>
			<td><code>textSize</code></td>
			<td>Size of nicknames
				<br>
				<br>
				<b>Possible values:</b> <code>xsmall</code>, <code>small</code>, <code>medium</code>, <code>large</code>, <code>xlarge</code>
				<br>
				<b>Default value:</b> <code>xsmall</code>
			</td>
		</tr>
		
		<tr>
			<td><code>icon</code></td>
			<td>Fontawesome user icon 
				<br>
				<br>
				<b>Possible values:</b> Any FontAwesome icon : <code>fa-user</code>, <code>fa-circle-o</code> ...
				<br>
				<b>Default value:</b> <code>fa-user</code>
			</td>
		</tr>
		
		<tr>
			<td><code>msgEmptyServer</code></td>
			<td>Display message when server is empty
				<br>
				<br>
				<b>Possible values:</b> Any string you want!
				<br>
				<b>Default value:</b> <code>Nobody's online !</code>
			</td>
		</tr>

	</tbody>
</table>
