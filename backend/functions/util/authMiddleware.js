const { admin, db } = require('./admin');

// Authentication Middleware
exports.TokenAuthentication = (request, response, next) => {
  let token;
  if (request.headers.token) token = request.headers.token;
  else return response.status(403).json({ error: 'unauthorised' });
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      request.user = decodedToken;
      db.collection('users')
        .where('userId', '==', request.user.uid)
        .limit(1)
        .get()
        .then((data) => {
          const { handle, imageURL } = data.docs[0].data();
          // *Save* the handle and imageURL in request.user for the next call
          request.user.handle = handle;
          request.user.imageURL = imageURL;
          return next();
        })
        .catch((err) => response.json(403).json({ error: err.code }));
    })
    .catch((err) => response.status(403).json({ error: err.code }));
};
