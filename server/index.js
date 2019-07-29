const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { login, logout, register, userSession} = require('./controller/authController')
require('dotenv').config();
const app = express();
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;
app.use(express.json());


massive(CONNECTION_STRING).then(db => {
    console.log(`connected to the db`)
    app.set('db', db)
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 // 2 weeks
    }
}))

//auth endpoints

app.post(`/auth/login`, login)
app.post(`/auth/register`, register)
// app.get(`/auth/user_session`)


app.listen(SERVER_PORT, () => console.log(`listening on server port ${SERVER_PORT}`))