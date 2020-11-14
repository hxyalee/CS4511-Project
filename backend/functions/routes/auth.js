const { db, firebase, firebaseConfig } = require('../util/admin');
// ------------------------------------------------------------------------------
// ------------------------------ SIGNUP ----------------------------------------
// ------------------------------------------------------------------------------

exports.signup = (request, response) => {
  let uid;
  let token;
  // newUser containing username, email and password (entered by user)
  const newUser = {
    email:           request.body.email,
    password:        request.body.password,
    confirmPassword: request.body.confirmPassword,
    handle:          request.body.handle,
  };
  
  db.doc(`users/${newUser.handle}`)
    .get()
    .then((doc) => {
      // check if username is available
      if (doc.exists) {
        return response
          .status(400)
          .json({ error: 'this handle is already taken' });
      } 
      // check if password and confirm password match
      else if (newUser.password != newUser.confirmPassword) {
        return response
          .status(400)
          .json({ error: 'passwords don\'t match' });
      }
      // if it is valud we can add to the user database
      else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      uid = data.user.uid;
      return data.user.getIdToken();
    })
    .then((tkn) => {
      token = tkn;
      const userCredentials = {
        userId:      uid,
        handle:      newUser.handle,
        email:       newUser.email,
        password:    newUser.password,
        name:        "",
        description: "",
        followers:   [],
        following:   [],
        reviews:     [],
        saved:       [],
        imageURL:    `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/no-image.png?alt=media`,
        blocked:     [],
        createdAt:   new Date().toISOString(),  
        };
      console.log(token);
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

exports.login = (request, response) => {
  const user = {
    email:    request.body.email,
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
