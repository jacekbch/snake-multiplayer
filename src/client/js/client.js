import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import ClientController from './controllers/client-controller';

import '../scss/main.scss';
import 'file?name=client/[name].[ext]!../index.html';


ReactDOM.render(<ClientController />, document.getElementById('root'));
