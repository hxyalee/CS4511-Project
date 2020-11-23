const { db, admin } = require('../util/admin');

exports.isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

exports.getSavedArray = async (user) => {
  let saved;
  return await db
    .collection('users')
    .doc(user)
    .get()
    .then((doc) => {
      data = doc.data();
      saved = data.saved.slice();
      return new Promise((res, rej) => res(saved));
    });
};
exports.getFollowingUserHandles = async (user) => {
  let following;
  return await db
    .collection('users')
    .doc(user)
    .get()
    .then((doc) => {
      data = doc.data();
      following = data.following.slice();
      return new Promise((res, rej) => res(following));
    });
};
exports.getFollowerUserHandles = async (user) => {
  let followers;
  return await db
    .collection('users')
    .doc(user)
    .get()
    .then((doc) => {
      data = doc.data();
      followers = data.followers.slice();
      return new Promise((res, rej) => res(followers));
    });
};
