# Snake Multiplayer

It is a project created as a part of my engeenering thesis that I wrote when I was graduating from univeristy (AGH Univeristy of Science and Technology, Computer Science).

Snake Multiplayer is a network game that runs in a user browser. It allows multiplayer game in realtime.

It is divided into two parts: client and server and uses asynchronous communication based on WebSocket (under Socket.IO library) between them.

It is all written in JavaScript (ES6). Server part runs on Node.js runtime engine. The actuall game is displayed in a browser with the use of Canvas technology.


## Building and running the game

The game is built using Gulp and Webpack tools.

Building:

```
gulp build
```

Or separately for client and server:

```
gulp build-client
gulp build-server
```

Running:

```
gulp run
```

You can also use the following command to automate all these previous ones 
(projects will be rebuild whenever a change will be made to any file):

```
gulp watch
```