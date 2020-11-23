const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const admin = require('firebase-admin');

app.use(cors());
const {
  signup,
  login,
  allUsers,
  addMoreUserDetails,
  searchUsers,
} = require('./routes/auth');
const { getUser, follow, unfollow } = require('./routes/users');
const { getReviews, createReview, getReview } = require('./routes/reviews');
const { TokenAuthentication } = require('./util/authMiddleware');
/* Authorisation related routes */
app.post('/signup', signup);
app.post('/login', login);
app.post('/allUsers', allUsers);
app.post('/addMoreUserDetails', addMoreUserDetails);
app.post('/searchUsers', searchUsers);

/* Post Related routes */
app.post('/getReviews', getReviews);
app.post('/review/:reviewId', getReview);
app.post('/createReview', TokenAuthentication, createReview);

/* User related routes */
app.get('/user/:handle', getUser);
app.post('/follow', TokenAuthentication, follow);
app.post('/unfollow', TokenAuthentication, unfollow);
exports.api = functions.region('asia-east2').https.onRequest(app);
