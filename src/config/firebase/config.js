// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAhr2z1aW4K2vYnaL_rZwBvT-rCb6CCf8",
  authDomain: "dev-portal-logistic.firebaseapp.com",
  projectId: "dev-portal-logistic",
  storageBucket: "dev-portal-logistic.appspot.com",
  messagingSenderId: "712240354352",
  appId: "1:712240354352:web:85eaeace315551e9ce89f5",
  measurementId: "G-Y4VZ1V0W37",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseStorage = getStorage(FirebaseApp);
// export const messaging = getMessaging(FirebaseApp);
// export const generateToken = async () => {
//   const permission = await Notification.requestPermission();
//   if (permission === "granted") {
//     const token = await getToken(messaging, {
//       vapidKey:
//         "BF4gAvJg3Jo8XzkUvkkha3dvrq8RgPSVxT0F6DN547MHTxN-XqyRdSTlEJTJflECkDl6uBOJDtxe6d_fTAwNyOY",
//     });
//     console.log(token);
//   }
// };
const analytics = getAnalytics(FirebaseApp);
