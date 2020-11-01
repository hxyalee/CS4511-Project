const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const admin = require('firebase-admin');

app.use(cors());

exports.api = functions.region('asia-east2').https.onRequest(app);
