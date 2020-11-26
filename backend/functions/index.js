const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000,
  })
);
const admin = require('firebase-admin');

app.use(cors());
const {
  signup,
  login,
  allUsers,
  addMoreUserDetails,
} = require('./routes/auth');
const {
  getUser,
  getUserProfile,
  follow,
  unfollow,
  search,
  following,
  followers,
  getSelf,
} = require('./routes/users');
const {
  getReviews,
  createReview,
  getReview,
  saveReview,
  unsaveReview,
  getSavedReviews,
  like,
  unlike,
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
app.post('/reviews/saved', TokenAuthentication, getSavedReviews);
app.post('/like', TokenAuthentication, like);
app.post('/unlike', TokenAuthentication, unlike);
/* User related routes */
app.get('/search', search);
app.get('/user/:handle', getUser);
app.get('/user/profile/:handle', getUserProfile);
app.get('/user', TokenAuthentication, getSelf);
app.post('/follow', TokenAuthentication, follow);
app.post('/unfollow', TokenAuthentication, unfollow);
app.get('/:handle/following', following);
app.get('/:handle/follower', followers);

exports.api = functions.region('asia-east2').https.onRequest(app);
