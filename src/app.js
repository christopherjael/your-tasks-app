const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const morgan = require('morgan');
const path = require('path');
const dbConnection = require('./db/config');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

module.exports = class Server {
  constructor() {
    this.app = express();
    this.paths = {
      home: '/',
      tasks: '/tasks',
    };
    this.port = process.env.PORT || 8080;

    this.connectDatabase();

    this.middlewares();

    this.routes();
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

    // session setup
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET || 'secret xd',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 1000 * 60 * 60 },
        store: MongoStore.create({
          mongoUrl: process.env.MONGODB_URI,
          autoRemove: true,
        }),
      })
    );

    // passport initialize
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  routes() {
    /* home */
    this.app.use(this.paths.home, require('./routes/home.routes.js'));
    /* auth */
    this.app.use(this.paths.home, require('./routes/auth.routes.js'));
    /* tasks */
    this.app.use(this.paths.tasks, require('./routes/tasks.routes.js'));

    /* 404 page not found */
    this.app.use((req, res) => {
      res.render('404');
    });
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
