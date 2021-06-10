//npm install firebase
import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCBZYQHnaXdyGc4rZDJBKa08VopPk7a73Q",
  authDomain: "frans-healthy-henry.firebaseapp.com",
  projectId: "frans-healthy-henry",
  storageBucket: "frans-healthy-henry.appspot.com",
  messagingSenderId: "68992010822",
  appId: "1:68992010822:web:460ab888d552e775979847",
  measurementId: "G-XZGQCP828E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//action creator
//iniciar sesion
export function loginWithGoogle() {
  //a esya funciom se la pasamos al reducer para que con una accion podamos hacer el logging
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((snap) => snap.user);
}

//cerrar sesion
export function singOutGoogle() {
  firebase.auth().signOut();
}
