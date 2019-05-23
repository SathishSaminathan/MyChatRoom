import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAKtxUcBXaxMti9m6bWzNvzaFdQmozbn7Y",
  authDomain: "mychatroom-b2f28.firebaseapp.com",
  databaseURL: "https://mychatroom-b2f28.firebaseio.com",
  projectId: "mychatroom-b2f28",
  storageBucket: "mychatroom-b2f28.appspot.com",
  messagingSenderId: "768250175875",
  appId: "1:768250175875:web:8dadc6640e9dbd71"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
