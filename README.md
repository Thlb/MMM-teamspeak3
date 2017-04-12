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
git clone https://github.com/Thlb/MMM-teamspeak3
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

| Option                       | Description
| ---------------------------- | -----------
| `host`                       | Hostname/IP of the Teamspeak Server.<br><br>**Required**<br>**Possible values:** `localhost`, `url` or a IP<br>**Default value:** `null`
| `serverPort`                 | Port of the Teamspeak Server.<br><br><br>**Default value:** ` 9987 ` (Default TeamSpeak3 voice port)
| `sid`                        | ID of the Teamspeak Server.<br><br><br>**Default value:** `''`
| `serverQueryPort`            | Port of the Teamspeak Server.<br><br><br>**Default value:** `10011` (Default TeamSpeak3 query port)
| `login`                      | Teamspeak ServerQuery login.<br><br>**Required**<br>**Default value:** `null`
| `passwd`                     | Teamspeak ServerQuery password.<br><br>**Required**<br>**Default value:** `null`
| `refreshInterval`            | The refresh interval of queries (in seconds).<br><br>**Default value:** `10`
| `displayIcon`                | Display FontAwesome user icon<br><br>**Possible values:** `true` or `false`<br>**Default value:** `true`
| `textAlign`                  | Text alignment<br><br>**Possible values:** `align-left` or `align-right`<br>**Default value:** Depending on module position: if bottom-right or top_right : `align-right`, else : `align-left`
| `iconSize`                   | Size of FontAwesome user icon<br><br>**Possible values:** `xsmall`, `small`, `medium`, `large`, `xlarge`<br>**Default value:** `small`
| `textSize`	               | Size of nicknames<br><br>**Possible values:** `xsmall`, `small`, `medium`, `large`, `xlarge`<br>**Default value:** `xsmall`
| `icon`                       | Fontawesome user icon <br><br>**Possible values:** Any FontAwesome icon : `fa-user`, `fa-circle-o` ...<br>**Default value:** `fa-circle-o`
| `msgEmptyServer`             | Display message when server is empty<br><br>**Possible values:** Any string you want!<br>**Default value:** `Nobody's online !`
