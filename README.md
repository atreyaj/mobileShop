# The mobile item list
A NativeScript-built iOS and Android app for managing shop items

**Note**: This app was made for testing lovefield on mobile apps as a offline api and database option.

To test if the offline database works, i have setup a json.db in the **node-json-server** directory. 
To run it (And the entire project), you need to have [_npm_](https://docs.npmjs.com/getting-started/installing-node) installed first, then install json-server using the command.
 
_npm install -g json-server_

Afterwards, go to the **node-json-server** directory and run the command:

_json-server db.json --watch_

to run the mobile project, you need to have nativescript installed. To install Nativescript, follow [This](http://docs.nativescript.org/start/quick-setup) installation guide.
When you got Nativescript up and running, you can type the command
 
 _tns run_ android | ios (Choose either android or ios, ios only works on apple devices)
 
 To test the offline database, turn off the api(Does not work yet!), at any given moment and the data you could see with the help of the api, should still be available to you.
