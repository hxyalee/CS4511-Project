const { db } = require('../util/admin');

/*
exports.getSavedList = (request, response) => {
    let user = {};
    db.collection('users')
      .doc(request.params.handle)
      .get()
      .then((data) => {
        if (data.exists) {
            console.log(data.data());
            user.user = data.data();
        } else {
            return response.status(404).json({ error: 'user not found' });
        }
      })
      .catch((err) => {
        console.log(err);
        return response.status(500).json({ error: err.code });
      });

}
*/


