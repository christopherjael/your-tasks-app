require('dotenv').config();
const Server = require('./src/app');

const serverInstance = new Server();

serverInstance.listen();
