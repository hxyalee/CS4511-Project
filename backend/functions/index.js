const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const admin = require('firebase-admin');

app.use(cors());
const { signup, login } = require('./routes/auth');
const { getUser } = require('./routes/users');
const { getReviews, createReview, getReview } = require('./routes/reviews');
const { TokenAuthentication } = require('./util/authMiddleware');
/* Authorisation related routes */
app.post('/signup', signup);
app.post('/login', login);
/* Post Related routes */
app.post('/getReviews', getReviews);
app.post('/reivew/:reviewId', getReview);
app.post('/createReview', TokenAuthentication, createReview);
/* User related routes */
app.get('/user/:handle', getUser);
exports.api = functions.region('asia-east2').https.onRequest(app);
