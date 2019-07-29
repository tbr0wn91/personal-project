const express = require('express');
const massive = require('massive');
const session = require('express-session')
require('dotenv').config();
const app = express();
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;
app.use(express.json());




app.listen(SERVER_PORT, () => console.log(`listening on server port ${SERVER_PORT}`))