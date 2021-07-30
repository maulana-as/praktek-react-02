import firebase from 'firebase/app'; 
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

***H***
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.8.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDq8vSpERysBcegot8YmHpYJHA4AZeU1Os",
    authDomain: "arvis-test-project.firebaseapp.com",
    projectId: "arvis-test-project",
    storageBucket: "arvis-test-project.appspot.com",
    messagingSenderId: "423931521117",
    appId: "1:423931521117:web:2c10519e12bab2f1a8c5b4",
    measurementId: "G-9M7SR0K1ER"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>