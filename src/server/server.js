import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import GameController from './controllers/game-controller';

let app = express();
let server = http.Server(app);
let io = new SocketIO(server);
let port = 3000;

//app.use(compression({}));
app.use(express['static'](__dirname + '/../client'));

const gameController = new GameController(io);
gameController.start();

server.listen(port, () => {
    console.log('[INFO] Listening on localhost:' + port);
});
