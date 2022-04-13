const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const morgan = require('morgan');
const path = require('path');
const dbConnection = require('./db/config');

module.exports = class Server {
  constructor() {
    this.app = express();
    this.paths = {
      home: '/',
      tasks: '/tasks',
    };
    this.port = process.env.PORT || 8080;

    this.middlewares();

    this.routes();

    this.connectDatabase();
  }
  middlewares() {
    // cors
    this.app.use(cors());

    // express json
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, 'public')));

    // morgan debugger
    this.app.use(morgan('dev'));

    // view engine setup
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'hbs');
    this.app.engine('hbs', require('hbs').__express);
    hbs.registerPartials(path.join(__dirname, '/views/partials'));
  }

  routes() {
    this.app.use(this.paths.home, require('./routes/home.routes.js'));
    this.app.use(this.paths.tasks, require('./routes/tasks.routes.js'));
  }

  async connectDatabase() {
    await dbConnection();
  }

  listen(
    message = `🚀 Server listening on port: ${this.port} | ${process.env.HOST}:${this.port}/`
  ) {
    this.app.listen(this.port, () => {
      console.log(message);
    });
  }
};
