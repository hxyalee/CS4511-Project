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
} = require('./routes/auth');
const { getUser, follow, unfollow, search } = require('./routes/users');
const {
  getReviews,
  createReview,
  getReview,
  saveReview,
  unsaveReview,
  getSavedReviews,
} = require('./routes/reviews');
const { TokenAuthentication } = require('./util/authMiddleware');
/* Authorisation related routes */
app.post('/signup', signup);
app.post('/login', login);

/* Post Related routes */
app.post('/getReviews', getReviews);
app.post('/review/:reviewId', getReview);
app.post('/createReview', TokenAuthentication, createReview);
app.post('/save', TokenAuthentication, saveReview);
app.post('/unsave', TokenAuthentication, unsaveReview);
app.post('/reviews/saved', TokenAuthentication, getSavedReviews)
/* User related routes */
app.get('/search', search);
app.get('/user/:handle', getUser);
app.post('/follow', TokenAuthentication, follow);
app.post('/unfollow', TokenAuthentication, unfollow);
exports.api = functions.region('asia-east2').https.onRequest(app);
