const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');

// setting up the store for user sessionss
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//connecting to the mongoDB to create a collection called meetuperSession
const store = new MongoDBStore({
  uri: config.DB_URI,
  collection: "meetuperSession"
});

store.on('error', (error) => console.log(error));

require("./models/meetups");
require("./models/users");
require("./models/threads");
require("./models/posts");
require("./models/categories");

require("./services/passport")

const meetupsRoutes = require('./routes/meetups'),
      usersRoutes = require('./routes/users'),
      threadsRoutes = require('./routes/threads'),
      postsRoutes = require('./routes/posts'),
      categoriesRoutes = require('./routes/categories');

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => console.log(err));

const app = express();

app.use(bodyParser.json());

//create a session to and store it in the collection called meetuperSession
app.use(session({
  secret: config.SESSION_SECRET,
  cookie: {maxAge: 3600000},  // one hour expiry for the cookie
  resave: false,
  saveUninitialized: false,
  store
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/meetups', meetupsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/threads', threadsRoutes);
app.use('/api/v1/categories', categoriesRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT , function() {
  console.log('App is running on port: ' + PORT);
});
