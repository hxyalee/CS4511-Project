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
