const { request } = require('express');
const { db, firebase, firebaseConfig } = require('../util/admin');

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
  let uid;
  let token;
  // newUser containing username (handle), email and password (entered by user)
  const newUser = {
    email:           request.body.email,
    password:        request.body.password,
    confirmPassword: request.body.confirmPassword,
    handle:          request.body.handle,
    // used to test for later
    //name:            request.body.name,
    //description:     request.body.description,
    //followers:       request.body.followers,
    //following:       request.body.following
  };
  
  db.doc(`users/${newUser.handle}`)
    .get()
    .then((doc) => {
      // check if username is available
      if (doc.exists) {
        return response
          .status(400)
          .json({ error: 'username is already taken' });
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
        // used to directly insert
        /*name:        newUser.name,
        description: newUser.description,
        followers:   newUser.followers,
        following:   newUser.following,*/
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
// "logs the user in" and gets token
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

// ------------------------------------------------------------------------------
// ----------------------------- ALL USERS --------------------------------------
// ------------------------------------------------------------------------------
// Test Function: check all the users in the database (used for debugging)
exports.allUsers = (request, response) => {
  db.collection('users').get().then((data) => {
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
    email:       request.body.email,
    name:        request.body.name,
    description: request.body.description,
    image:       request.body.image,
  };
  db.collection('users').get().then((data) => {
      let users = [];
      data.forEach((doc) => {
        if (user.email == doc._fieldsProto.email.stringValue) {
          console.log("----------------------");
          console.log(doc._fieldsProto);
          // updating the fields to match the input
          doc._fieldsProto.name        = { stringValue: user.name, valueType: 'stringValue' };
          doc._fieldsProto.description = { stringValue: user.description, valueType: 'stringValue' };
          doc._fieldsProto.imageURL    = { stringValue: user.image, valueType: 'stringValue' };
          console.log("----------------------");
          console.log(doc._fieldsProto);
        }
        users.push({
          email:       doc._fieldsProto.email.stringValue,
          name:        doc._fieldsProto.name.stringValue,
          description: doc._fieldsProto.description.stringValue,
          //image:       doc._fieldsProto.imageURL.stringValue,
          ...doc.data,
        });
      });
      return response.json(users);
    })
    .catch((err) => console.error(err));
};  

// ------------------------------------------------------------------------------
// --------------------------- SEARCH FOR USERS ---------------------------------
// ------------------------------------------------------------------------------
// get a list of users given a search input
exports.searchUsers = (request, response) => {
  const user = {
    handle:       request.body.handle,       // takes in email, should change to use the user's token
    searchterm:   request.body.searchterm,   // search term taken from the search bar
  };
  // loop through the users for the user matching on e-mail (probably needs to change using userID of somoe sort)
  db.collection('users').get().then((data) => {
      let users = [];
      data.forEach((doc) => {
        
        // make sure it's not themself AND matches the substring to the username
        if (user.handle != doc._fieldsProto.handle.stringValue && 
           doc._fieldsProto.handle.stringValue.toLowerCase().includes(user.searchterm.toLowerCase())) {
           
            var follow = 0; //variable to check if they are following
            // check if the user is being followed
            let followed = [];
            data.forEach((doc2) => {
              // get the original sender (inefficient method, probs will refactor)
              if (user.handle == doc2._fieldsProto.handle.stringValue) {
                //console.log(doc2._fieldsProto.following.arrayValue);
                //console.log(doc2._fieldsProto.handle.stringValue);
                var i;
                for (i=0; i<doc2._fieldsProto.following.arrayValue.values.length; i++) {
                  //console.log(doc2._fieldsProto.following.arrayValue.values[i].stringValue);
                  //console.log(doc._fieldsProto.handle.stringValue);
                  if (doc2._fieldsProto.following.arrayValue.values[i].stringValue == doc._fieldsProto.handle.stringValue) {
                    follow = 1;
                  }
                }
                if (follow == 1) {
                  console.log('following: '.concat(doc._fieldsProto.handle.stringValue));
                  users.push({
                    id: doc.id,
                    name:  doc._fieldsProto.name.stringValue,
                    image: doc._fieldsProto.imageURL.stringValue,
                    following: "UNFOLLOW",
                    ...doc.data,
                  });
                } else {
                  console.log('not following: '.concat(doc._fieldsProto.handle.stringValue));
                  users.push({
                    id: doc.id,
                    name:  doc._fieldsProto.name.stringValue,
                    image: doc._fieldsProto.imageURL.stringValue,
                    following: "FOLLOW",
                    ...doc.data,
                  });
                }
              } 
            });
            console.log(followed);
        }
      });
      return response.json(users);
    })
    .catch((err) => console.error(err));
}


// ------------------------------------------------------------------------------
// ----------------------------- FOLLOW USER ------------------------------------
// ------------------------------------------------------------------------------
// adds the person to their following list and adds themself to that persons followers list
exports.follow = (request, response) => {
  const user = {
    handle: request.body.handle,                // username
    searched_user: request.body.searched_user,  // the user to follow
  };

  db.collection('users').get().then((data) => {
    // add the searched user to their following list (the user follows the person)
    console.log('adding searched to the users following list')
    data.forEach((doc) => {
      if (doc._fieldsProto.handle.stringValue == user.handle) {
        var i;

        // testing the input before so I can compare later
        console.log("------ Before Following -----");
        for (i=0; i<doc._fieldsProto.following.arrayValue.values.length; i++) {
          console.log(doc._fieldsProto.following.arrayValue.values[i].stringValue);
        }   
        // pushing the value into the array
        //let temp = `{ stringValue: '${user.searched_user}', valueType: 'stringValue'}`
        var temp = {stringValue: user.searched_user, valueType: 'stringValue'}
        doc._fieldsProto.following.arrayValue.values.push(temp);

        // testing if added to the users side
        console.log("------ After Following -----");
        for (i=0; i<doc._fieldsProto.following.arrayValue.values.length; i++) {
          console.log(doc._fieldsProto.following.arrayValue.values[i].stringValue);
        }   
      }
    });
    console.log('adding the user to the searched users followers list')
    // add the user to the followers array for the searched user
    data.forEach((doc2) => {
      if (doc2._fieldsProto.handle.stringValue == user.searched_user) {
        var i;

        // testing the input before so I can compare later
        console.log("------ Before Following -----");
        for (i=0; i<doc2._fieldsProto.followers.arrayValue.values.length; i++) {
          console.log(doc2._fieldsProto.followers.arrayValue.values[i].stringValue);
        }   
        // pushing the value into the array
        var temp = {stringValue: user.handle, valueType: 'stringValue'}
        doc2._fieldsProto.followers.arrayValue.values.push(temp);

        // testing if added to the users side
        console.log("------ After Following -----");
        for (i=0; i<doc2._fieldsProto.followers.arrayValue.values.length; i++) {
          console.log(doc2._fieldsProto.followers.arrayValue.values[i].stringValue);
        }   
      }
    });
    return response.json("followed ".concat(user.searched_user));
   })
   .catch((err) => console.error(err));

}

// ------------------------------------------------------------------------------
// ---------------------------- UNFOLLOW USER -----------------------------------
// ------------------------------------------------------------------------------
// removes the person from the following list and thus removes themself from the followers list of that person
exports.unfollow = (request, response) => {
  const user = {
    handle:        request.body.handle,         // username
    searched_user: request.body.searched_user,  // the user to unfollow
  };

  db.collection('users').get().then((data) => {
    // remove from the user's following list (the user unfollowers the person)
    data.forEach((doc) => {
      if (doc._fieldsProto.handle.stringValue == user.handle) {
        var i;
        for (i=0; i<doc._fieldsProto.following.arrayValue.values.length; i++) {
          if (doc._fieldsProto.following.arrayValue.values[i].stringValue == user.searched_user) {
            //console.log(doc._fieldsProto.following.arrayValue.values[i].stringValue);
            // remove from the list - splice will remove the current one and go to the next 
            doc._fieldsProto.following.arrayValue.values.splice(i, 1);
          }
        }
        // testing if removed from the users side
        console.log("------Users side-----");
        for (i=0; i<doc._fieldsProto.following.arrayValue.values.length; i++) {
          console.log(doc._fieldsProto.following.arrayValue.values[i].stringValue);
        }
      }
    });
    // the followed person is no longer followed and so we remove the person
    data.forEach((doc2) => {
      if (doc2._fieldsProto.handle.stringValue == user.searched_user) {
        var i;
        for (i=0; i<doc2._fieldsProto.followers.arrayValue.values.length; i++) {
          if (doc2._fieldsProto.followers.arrayValue.values[i].stringValue == user.handle) {
            doc2._fieldsProto.followers.arrayValue.values.splice(i, 1);
          }
        }
        // testing if removed from the searched users side
        console.log("-----Recipients side------");
        for (i=0; i<doc2._fieldsProto.following.arrayValue.values.length; i++) {
          console.log(doc2._fieldsProto.following.arrayValue.values[i].stringValue);
        }
      }
    });
    return response.json("unfollowed ".concat(user.searched_user));
  })
  .catch((err) => console.error(err));
}