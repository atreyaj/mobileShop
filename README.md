# The mobile item list
A NativeScript-built iOS and Android app for managing shop items

**Note**: This application was made to connect to an api hence, the set server address page.

To test that the phone can connect to an api, i have set up a local api, with a json database. 
To run it (And the entire project), you need to have [_npm_](https://docs.npmjs.com/getting-started/installing-node) installed first, then install **json-server**(npm install -g json-server) using the command.
 
_npm install -g json-server_

Afterwards, go to the **node-json-server** directory and run the command:

_json-server db.json --watch_

to run the mobile project, you need to have Nativescript installed. To install Nativescript, follow [This](http://docs.nativescript.org/start/quick-setup) installation guide.
When you got Nativescript up and running, you can type the command
 
 _tns run_ android | ios (Choose either android or ios. Note that, ios only works on Apple devices)
 
 If you want to know what you ip-address is, open your terminal type **ifconfig**(Linux and Mac) and look for your network interface. Type the ip-address on the server page in the application. 
 The default port for the api, is 3000, if this is not the case for you, you can see it in the terminal, where you ran the **json-server** command.
  
  *Enjoy!*