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
    body: request.body.body,
    userHandle: request.user.handle,
    userImage: request.user.imageURL,
    createdAt: new Date().toISOString(),
    //createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    likeCount: 0,
    commentCount: 0,
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
