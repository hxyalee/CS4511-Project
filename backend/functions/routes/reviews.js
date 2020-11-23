const { db, admin } = require('../util/admin');
const { getSavedArray } = require('../util/helpers');

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

exports.getSavedReviews = (request, response) => {
  getSavedArray(request.user.handle).then((saved) => {
    let reviews = [];
    const allReviews = [];
    db.collection('reviews')
      .get()
      .then((data) => {
        data.forEach((doc) => {
          allReviews.push({ ...doc.data(), id: doc.id });
          // allReviews.push({...review.data(), doc.id})
        });
      })
      .then(() => {
        for (let i = 0; i < allReviews.length; i++) {
          if (saved.includes(allReviews[i].id)) reviews.push(allReviews[i]);
        }
        return response.json({ reviews });
      });
  });
};

// ------------------------------------------------------------------------------
// --------------------------- LIKE/HEART REACT ---------------------------------
// ------------------------------------------------------------------------------
// function for user to heart react post
exports.heartReview = (request, response) => {};

/**
 * HEADERS: {token}
 * BODY: {}
 */
exports.saveReview = (request, response) => {
  const reviewId = request.body.reviewId;
  const userhandle = request.user.handle;
  db.collection('reviews')
    .doc(reviewId)
    .get()
    .then((doc) => {
      if (!doc.exists)
        return response.status(400).json({ error: 'Review does not exist' });
      return;
    })
    .catch((e) => response.status(400).json({ error: e.code }));
  db.collection('users')
    .doc(userhandle)
    .update({ saved: admin.firestore.FieldValue.arrayUnion(reviewId) })
    .then((res) => response.json({}))
    .catch((e) => response.status(400).json({ error: e.code }));
};
/**
 * HEADERS: {token}
 * BODY: {}
 */
exports.unsaveReview = (request, response) => {
  const reviewId = request.body.reviewId;
  const userhandle = request.user.handle;
  db.collection('users')
    .doc(userhandle)
    .update({ saved: admin.firestore.FieldValue.arrayRemove(reviewId) })
    .then((res) => response.json({}))
    .catch((e) => response.status(400).json({ error: e.code }));
};
