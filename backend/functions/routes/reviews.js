const { db } = require('../util/admin');

// ------------------------------------------------------------------------------
// ----------------------------- REVIEWS LSIT -----------------------------------
// ------------------------------------------------------------------------------
// Return a list of all of reivews
exports.getReviews = (request, response) => {
  db.collection('reviews')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let reviews = [];
      data.forEach((doc) => {
        reviews.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return response.json(reviews);
    })
    .catch((err) => console.error(err));
};

// ------------------------------------------------------------------------------
// --------------------------- INDIVIDUAL REVIEW --------------------------------
// ------------------------------------------------------------------------------
// Return ONE particular review
exports.getReview = (request, response) => {
  let reviewData = {};
  db.collection('reviews')
    .doc(request.params.reviewId)
    .get()
    .then((doc) => {
      if (!doc.exists)
        return response.status(404).json({ error: 'review not found!' });
      reviewData = doc.data();
      reviewData.reviewId = doc.id;
      return response.json(reviewData);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.createReview = (request, response) => {
  const newReview = {
    createdAt: new Date().toISOString(),
    rating: request.body.rating,
    userHandle: request.user.handle,
    body: request.body.body,
    price: request.body.price,
    userImage: request.user.imageURL,
    location: request.body.location,
    hearted: [],
    likeCount: 0,
    saved: [],
    comments: [], //not implementing
    commentCount: 0, //not implementing
    dietary: [],
    cuisine: [],
  };

  db.collection('reviews')
    .add(newReview)
    .then((doc) => {
      return response.json({ status: 'success', id: doc.id });
    })
    .catch((err) =>
      response.status(500).json({ error: 'something went wrong' })
    );
};

// ------------------------------------------------------------------------------
// --------------------------- LIKE/HEART REACT ---------------------------------
// ------------------------------------------------------------------------------
// function for user to heart react post
exports.heartReview = (request, response) => {};

// ------------------------------------------------------------------------------
// ------------------------------ SAVE REVIEW -----------------------------------
// ------------------------------------------------------------------------------
// save review to see later
exports.saveReview = (request, response) => {};

// ------------------------------------------------------------------------------
// ---------------------------- SEARCH & FILTER ---------------------------------
// ------------------------------------------------------------------------------
// display a set of reviews which follow the constraints
exports.search_filter = (request, response) => {
  const filter = {
    handle: request.body.handle, // this is the current login person
    price_range: request.body.price_range, // given price range (1 - cheap, 2 - medium, 3 - expensive)
    location_dist: request.body.location_dist, // within distance
    rating: request.body.rating, // between 0-5 where only accept reviews above
    dietary_opts: request.body.dietary_opts, // array of values ('vegan', 'vegetarian', etc)
  };
};
