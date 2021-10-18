import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTHDOMAIN,
//     projectId: process.env.FIREBASE_PROJECTID,
//     storageBucket: process.env.FIREBASE_STORAGEBUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
//     appId: process.env.FIREBASE_APPID,
//     measurementId: process.env.FIREBASE_MEASUREMEMTID,
// };
const firebaseConfig = {
    apiKey: "AIzaSyD4a24L1CjrSrMmNF2BTxcNzjRqvm5H-vY",
    authDomain: "concern-2911f.firebaseapp.com",
    projectId: "concern-2911f",
    storageBucket: "concern-2911f.appspot.com",
    messagingSenderId: "758417662217",
    appId: "1:758417662217:web:b4af790fbba4daf93cb3d8",
    measurementId: "G-KCKJDGYHRH"
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

export default storage 