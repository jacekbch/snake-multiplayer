'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _gameController = require('./controllers/game-controller');

var _gameController2 = _interopRequireDefault(_gameController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);
var io = new _socket2.default(server);
var port = 3000;

//app.use(compression({}));
app.use(_express2.default['static'](__dirname + '/../client'));

var gameController = new _gameController2.default(io);
gameController.start();

server.listen(port, function () {
    console.log('[INFO] Listening on localhost:' + port);
});