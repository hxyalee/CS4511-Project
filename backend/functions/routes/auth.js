const { db, firebase, firebaseConfig } = require('../util/admin');
const { isValidEmail, hasWhiteSpace } = require('../util/helpers');

/*
  PAGES & THEIR BACKEND FUNCTIONS:

 TOP ROW PAGES
 - Login Screen:   login(email, password)
 - Signup:         signup(email, password, confirmPassword, handle)
 - Onboarding 5:   addMoreUserDetails(email, name, description, image)
 - Onboarding 1:   no backend functions used, the two options just change page
 - Onboarding 2-7: searchUsers(email, searchterm), follow(handle), unfollow(handle)
 */

// ------------------------------------------------------------------------------
// ------------------------------ SIGNUP ----------------------------------------
// ------------------------------------------------------------------------------
// creates a new user in the firebase database using email & password
exports.signup = (request, response) => {
  // newUser containing username (handle), email and password (entered by user)
  const newUser = {
    email: request.body.email,
    password: request.body.password,
    handle: request.body.handle,
    name: request.body.name,
    // used to test for later
    //name:            request.body.name,
    //description:     request.body.description,
    //followers:       request.body.followers,
    //following:       request.body.following
  };
  /**
   * Basic check
   */
  if (!isValidEmail(newUser.email))
    return response.status(400).json({ error: 'Invalid Email' });
  if (newUser.password != request.body.confirmPassword)
    return response.status(400).json({ error: "Passwords don't match" });
  if (newUser.handle === '')
    return response.status(400).json({ error: 'Username cannot be empty' });
  if (hasWhiteSpace(newUser.handle))
    return response
      .status(400)
      .json({ error: 'Username cannot contain spaces' });
  let uid;
  db.doc(`users/${newUser.handle}`)
    .get()
    .then((doc) => {
      // check if username is available
      if (doc.exists)
        return response
          .status(400)
          .json({ error: 'username is already taken' });
      // check if password and confirm password match
      // if it is valud we can add to the user database
      else
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
    })
    .then((data) => {
      uid = data.user.uid;
      return data.user.getIdToken();
    })
    .then((tkn) => {
      const userCredentials = {
        email: newUser.email,
        handle: newUser.handle,
        name: newUser.name,
        description: '',
        userId: uid,
        followers: [],
        following: [],
        reviews: [],
        saved: [],
        imageURL: '',
        blocked: [],
        createdAt: new Date().toISOString(),
      };
      db.collection('users')
        .doc(newUser.handle)
        .set(userCredentials)
        .then(() => {
          return response.status(201).json({ token: tkn });
        });
    })
    .catch((err) => {
      if (err.code == 'auth/email-already-in-use')
        return response.status(400).json({ error: 'email already in use' });
      return response.status(500).json({ error: err.code });
    });
};

// ------------------------------------------------------------------------------
// ------------------------------- LOGIN ----------------------------------------
// ------------------------------------------------------------------------------
// "logs the user in" and gets token
exports.login = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => response.json({ token }))
    .catch((err) => {
      if (err.code === 'auth/wrong-password') {
        return response.status(403).json({ error: 'Wrong password' });
      }
      return response.status(500).json({ error: err.code });
    });
};
