import firebase from 'firebase/app'; 
import 'firebase/database'; 

    const firebaseConfig = {
        apiKey: "AIzaSyAypbgrSlQWzIjBdVr30VV_hZncaC_x_lA",
        authDomain: "vinyl-resting-place.firebaseapp.com",
        databaseURL: "https://vinyl-resting-place.firebaseio.com",
        projectId: "vinyl-resting-place",
        storageBucket: "vinyl-resting-place.appspot.com",
        messagingSenderId: "696854720831",
        appId: "1:696854720831:web:0648b5086ca196ece9a38a"
    };
    
    firebase.initializeApp(firebaseConfig);

export default firebase;