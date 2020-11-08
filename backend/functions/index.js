const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const admin = require('firebase-admin');

app.use(cors());
const { signup, login } = require('./routes/auth');
/* Authorisation related routes */
app.post('/signup', signup);
app.post('/login', login);
exports.api = functions.region('asia-east2').https.onRequest(app);
