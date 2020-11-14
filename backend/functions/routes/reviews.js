const { db } = require('../util/admin');



// Return a LIST of reivews
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
      return reviewData;
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ error: err.code });
    });
};



exports.createReview = (request, response) => {
  const newReview = {
    createdAt:    new Date().toISOString(),
    rating:       request.body.rating,
    userHandle:   request.user.handle,
    body:         request.body.body,
    hearted:      [],
    likeCount:    0,
    saved:        [],
    comments:     [],     //not implementing
    commentCount: 0,
    location:     request.body.location,
    dietary:      [],
    cuisine:      [],
    price:        1,
    userImage:    request.user.imageURL,
  };

  db.collection('reviews')
    .add(newReview)
    .then((doc) => {
      response.json({ status: 'success', id: doc.id });
    })
    .catch((err) =>
      response.status(500).json({ error: 'something went wrong' })
    );
};
