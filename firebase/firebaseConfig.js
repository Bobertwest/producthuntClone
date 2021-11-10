import app from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA7UUqeVRum4m4cGyEqA__TCfu-ktYlas4",
    authDomain: "product-hunt-clone-5993c.firebaseapp.com",
    projectId: "product-hunt-clone-5993c",
    storageBucket: "product-hunt-clone-5993c.appspot.com",
    messagingSenderId: "1022086979452",
    appId: "1:1022086979452:web:6803fda6920f6a33c90ef9"
};

// Initialize Firebase
if (!app.apps.length) {
    app.initializeApp(firebaseConfig);
}
const auth = app.auth()

export { auth }
export default app