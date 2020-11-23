import * as functions from 'firebase-functions';
import admin = require('firebase-admin');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const app = admin.initializeApp();
const db = app.firestore();

export const getFavorites = functions.https.onCall(async (data, context) => {
    const uid = data.uid
    if(uid){
        const userDoc = await db.doc(`users/${uid}`).get();
        const userData = userDoc.data();
        return userData
    }else{
        return {}
    }

})