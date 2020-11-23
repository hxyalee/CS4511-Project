const { db, admin, firebase, firebaseConfig } = require('../util/admin');

exports.getUser = (request, response) => {
  let user = {};
  db.collection('users')
    .doc(request.params.handle)
    .get()
    .then((data) => {
      if (data.exists) {
        user.user = data.data();
        return db
          .collection('reviews')
          .where('userHandle', '==', request.params.handle)
          .orderBy('createdAt', 'desc')
          .get();
      } else {
        return response.status(404).json({ error: 'user not found' });
      }
    })
    .then((data) => {
      if (!data.exists) return response.json(user);
      user.reviews = [];
      data.forEach((doc) => {
        user.reviews.push({
          ...doc.data(),
          reivewId: doc.id,
        });
      });
      return response.json(user);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ error: err.code });
    });
};

/**
 * HEADERS: {token}
 * BODY: {handle}
 */
exports.follow = (request, response) => {
  const follower = request.user.handle;
  const toFollow = request.body.handle;
  db.collection('users')
    .doc(toFollow)
    .get()
    .then((doc) => {
      if (!doc.exists)
        return response
          .status(400)
          .json({ error: `${toFollow} does not exist` });
    });
  const userRef = db.collection('users').doc(follower);
  const toFollowRef = db.collection('users').doc(toFollow);
  userRef
    .update({
      following: admin.firestore.FieldValue.arrayUnion(toFollow),
    })
    .then(() => {
      toFollowRef.update({
        followers: admin.firestore.FieldValue.arrayUnion(follower),
      });
    })
    .then(() => response.json({}))
    .catch((err) => {
      return response.status(500).json({ error: err.code });
    });
};
/**
 * HEADERS: {token}
 * BODY: {handle}
 */
exports.unfollow = (request, response) => {
  const follower = request.user.handle;
  const toFollow = request.body.handle;
  db.collection('users')
    .doc(toFollow)
    .get()
    .then((doc) => {
      if (!doc.exists)
        return response
          .status(400)
          .json({ error: `${toFollow} does not exist` });
    });
  const userRef = db.collection('users').doc(follower);
  const toFollowRef = db.collection('users').doc(toFollow);
  userRef
    .update({
      following: admin.firestore.FieldValue.arrayRemove(toFollow),
    })
    .then(() => {
      toFollowRef.update({
        followers: admin.firestore.FieldValue.arrayRemove(follower),
      });
    })
    .then(() => response.json({}))
    .catch((err) => {
      return response.status(500).json({ error: err.code });
    });
};
