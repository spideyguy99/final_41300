import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCZjjnZz9R1IfFicPrE6baUcPYldnK9kCU",
    authDomain: "final-7687b.firebaseapp.com",
    databaseURL: "https://final-7687b.firebaseio.com",
    projectId: "final-7687b",
    storageBucket: "final-7687b.appspot.com",
    messagingSenderId: "142449073278",
    appId: "1:142449073278:web:9f9f4380f137619dab4c2f"
};
// Initialize Firebase
 const fire = firebase.initializeApp(firebaseConfig);

 export default fire;