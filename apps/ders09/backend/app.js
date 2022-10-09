const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./db/users');


const app = express();

app.use(cors({
    origin: 'http://localhost:8080'
}));

const matchApi = require('./routes/match-api');
const authApi = require('./routes/auth-api');


//JSON için
app.use(bodyParser.json());


//passport, session vs.
app.use(session({
    secret: 'cookie sifrelenirken kullanialcak secret key',
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = Users.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid username/password'});
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = Users.getUser(id);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});


app.use(passport.initialize());
app.use(passport.session());

// Route
app.use('/api',matchApi);
app.use('/api',authApi);


module.exports = app;