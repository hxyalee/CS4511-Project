const { db, admin, firebase, firebaseConfig } = require('../util/admin');
const {
  getFollowingUserHandles,
  getFollowerUserHandles,
} = require('../util/helpers');

exports.getUserProfile = (request, response) => {
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

exports.getSelf = (request, response) => {
  let user = {};
  db.collection('users')
    .doc(request.user.handle)
    .get()
    .then((data) => {
      if (data.exists) {
        user.user = data.data();
        return db
          .collection('reviews')
          .where('userHandle', '==', request.user.handle)
          .orderBy('createdAt', 'desc')
          .get();
      } else {
        return response.status(404).json({ error: 'user not found' });
      }
    })
    .then((data) => {
      console.log(data);
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

exports.getUser = (request, response) => {
  db.collection('users')
    .doc(request.params.handle)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response.json(doc.data());
      } else {
        return response.status(404).json({ error: 'user not found' });
      }
    })
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

exports.following = (request, response) => {
  const handle = request.params.handle;

  getFollowingUserHandles(handle)
    .then((following) => {
      let ret = [];
      let allUsers = [];
      db.collection('users')
        .get()
        .then((users) => {
          users.forEach((user) =>
            allUsers.push({ ...user.data(), handle: user.id })
          );
        })
        .then(() => {
          ret = allUsers.filter((user) => following.includes(user.handle));
          return response.json({ users: ret });
        });
    })
    .catch((err) => {
      return response.status(500).json({ error: err.code });
    });
};
exports.followers = (request, response) => {
  const handle = request.params.handle;

  getFollowerUserHandles(handle)
    .then((following) => {
      let ret = [];
      let allUsers = [];
      db.collection('users')
        .get()
        .then((users) => {
          users.forEach((user) =>
            allUsers.push({ ...user.data(), handle: user.id })
          );
        })
        .then(() => {
          ret = allUsers.filter((user) => following.includes(user.handle));
          return response.json({ users: ret });
        });
    })
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

exports.search = (request, response) => {
  const query = request.query.q.toLowerCase();
  db.collection('users')
    .get()
    .then((data) => {
      const users = [];
      data.forEach((doc) => {
        const user = doc.data();
        if (user.handle.toLowerCase().includes(query)) {
          users.push({
            handle: user.handle,
            name: user.name,
            img: user.imageURL,
          });
        }
      });
      return response.json({ users: users });
    })
    .catch((e) => response.status(500).json({ error: e.code }));
};
