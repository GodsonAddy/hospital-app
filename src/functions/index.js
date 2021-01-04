const functions = require('firebase-functions');
const admin = require('firebase-admin')
var serviceAccount = require("hospital-app.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hospital-app-d0b27-default-rtdb.firebaseio.com"
  });

const db = admin.firestore()

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {

  if (authUser.email) {
    const customClaims = {
      admin: true,
    };
    try {
       await admin.auth().setCustomUserClaims(authUser.uid, customClaims)

      return db.collection("roles").doc(authUser.uid).set({
        email: authUser.email,
        role: customClaims
      })

    } catch (error) {
      console.log(error)
    }

  }

});