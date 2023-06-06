const express = require('express');
const session = require('express-session'); 

const path = require('path');
const morgan = require('morgan');
require('dotenv').config();
require('@babel/register');
const FileStore = require('session-file-store')(session);

const dbConnect = require('./db/dbconnect');


const indexRouter = require('./routes');
const authRouter = require('./routes/auth.js');
const privateRouter = require('./routes/private.js');


const notFoundPage = require('./controllers/notfound404.js');
const errorPage = require('./controllers/error.js');

const app = express();

dbConnect();

app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  name: 'sid',
  store: new FileStore({}), 
  secret: process.env.COOKIE_SECRET, 
  resave: false,                   
  saveUninitialized: false, 
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 1000 * 60 * 60 * 24 * 10,
  },
}

app.use(session(sessionConfig));

app.use((req, res, next) => {
  console.log("\n\x1b[33m", 'req.session.user :', req.session?.user);
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/private', privateRouter);


app.use(notFoundPage);
app.use(errorPage);

const port = process.env.PORT ?? 3100;
app.listen(port, (err) => {
  if (err) return console.log('Ошибка запуска сервера.');
  console.log('Сервер запущен. http://localhost:%s', port);
});
