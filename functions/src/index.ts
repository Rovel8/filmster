import * as functions from 'firebase-functions';
import admin = require('firebase-admin');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const app = admin.initializeApp();
const db = app.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello World from Firebase!");
});

export const getFavorites = functions.https.onRequest( async (request, response) => {
    const userId = request.query.uid;
    if(userId){
        response.send(`I am going to get favorites for user ${userId}`);
        const snapshot = await db.collection('users').limit(1).get();
        snapshot.forEach(docSnap => {
            console.log(docSnap.data());
        })
    }else{
        response.send('No user ID')
    }
});

