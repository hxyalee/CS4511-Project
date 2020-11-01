const admin = require('firebase-admin');
const serviceAccount = require('./util/serviceAccountKey.json');
const firebase = require('firebase');
const firebaseConfig = {
  apiKey: 'AIzaSyAjIZfL58fKJyBHVYz6oKbI7vE6aGDMW-I',
  authDomain: 'project-4d358.firebaseapp.com',
  databaseURL: 'https://project-4d358.firebaseio.com',
  projectId: 'project-4d358',
  storageBucket: 'project-4d358.appspot.com',
  messagingSenderId: '735344014568',
  appId: '1:735344014568:web:2f89f66e7ac3922cd5455d',
  measurementId: 'G-ZBKX8NGVW0',
};
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://project-4d358.firebaseio.com',
});
const db = admin.firestore();

module.exports({ admin, db, firebase });
