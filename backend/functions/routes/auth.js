const { db, firebase, firebaseConfig } = require('../util/admin');
const { isValidEmail } = require('../util/helpers');

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
      return data.user.getIdToken();
    })
    .then((tkn) => {
      const userCredentials = {
        email: newUser.email,
        handle: newUser.handle,
        name: newUser.name,
        description: '',
        followers: [],
        following: [],
        reviews: [],
        saved: [],
        imageURL: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/no-image.png?alt=media`,
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
/* 
// ------------------------------------------------------------------------------
// ----------------------------- ALL USERS --------------------------------------
// ------------------------------------------------------------------------------
// Test Function: check all the users in the database (used for debugging)
exports.allUsers = (request, response) => {
  db.collection('users')
    .get()
    .then((data) => {
      let users = [];
      data.forEach((doc) => {
        // print the users username, real name, email and their password
        users.push({
          id: doc.id,
          name: doc._fieldsProto.name.stringValue,
          email: doc._fieldsProto.email.stringValue,
          password: doc._fieldsProto.password.stringValue,
          following: doc._fieldsProto.following,
          ...doc.data,
        });
      });
      return response.json(users);
    })
    .catch((err) => console.error(err));
};

// ------------------------------------------------------------------------------
// ------------------------ ADD MORE USER DETAILS -------------------------------
// ------------------------------------------------------------------------------
//  - customize profile: add profile picture, name and description to users profile
//  - NOTE: doesn't save the changes to database
exports.addMoreUserDetails = (request, response) => {
  const user = {
    email: request.body.email,
    name: request.body.name,
    description: request.body.description,
    image: request.body.image,
  };
  db.collection('users')
    .get()
    .then((data) => {
      let users = [];
      data.forEach((doc) => {
        if (user.email == doc._fieldsProto.email.stringValue) {
          console.log('----------------------');
          console.log(doc._fieldsProto);
          // updating the fields to match the input
          doc._fieldsProto.name = {
            stringValue: user.name,
            valueType: 'stringValue',
          };
          doc._fieldsProto.description = {
            stringValue: user.description,
            valueType: 'stringValue',
          };
          doc._fieldsProto.imageURL = {
            stringValue: user.image,
            valueType: 'stringValue',
          };
          console.log('----------------------');
          console.log(doc._fieldsProto);
        }
        users.push({
          email: doc._fieldsProto.email.stringValue,
          name: doc._fieldsProto.name.stringValue,
          description: doc._fieldsProto.description.stringValue,
          //image:       doc._fieldsProto.imageURL.stringValue,
          ...doc.data,
        });
      });
      return response.json(users);
    })
    .catch((err) => console.error(err));
};
 */
