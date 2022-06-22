const functions = require("firebase-functions");
const admin = require("firebase-admin")
admin.initializeApp();

// Cloud Function: addAdminRole
// Implementations: multiple callbacks
// After finished function, you need to deploy it to the firebase function by 'firebase  deploy --only functions' at terminal
exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email) // Identify user by user's email
    .then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
        });
     // Success Notification
    }).then(() => {
        console.log("Successfully Added!");
        return {
            message: `Success! ${data.email} has been made an admin!`,
        };
    })
    // Error Notification
    .catch((err) => {
        console.log("Error");
        console.log(err);
    });
});

