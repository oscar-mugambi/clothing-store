import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDjqBgIcNRurGIiKCjjWZAtBZ8CERk3iFY",
  authDomain: "clothing-store-511e9.firebaseapp.com",
  databaseURL: "https://clothing-store-511e9.firebaseio.com",
  projectId: "clothing-store-511e9",
  storageBucket: "clothing-store-511e9.appspot.com",
  messagingSenderId: "607073580106",
  appId: "1:607073580106:web:1e229d9ced4dbfb0c7a2b3",
  measurementId: "G-X55SBYQGMN"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get(); //get snapshot

  if (!snapShot.exists) {
    //use document reference to create, not the snapshot (reps data)
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  console.log(snapShot);
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
