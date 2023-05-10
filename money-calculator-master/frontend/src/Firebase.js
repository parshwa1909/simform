import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBL_NqNHlimJTGs_bu1Aaz7D9LRm8PXdgE",
    authDomain: "money-tracker-mp.firebaseapp.com",
    projectId: "money-tracker-mp",
    storageBucket: "money-tracker-mp.appspot.com",
    messagingSenderId: "376086086369",
    appId: "1:376086086369:web:ad300fa6d991ac3e052da0",
    measurementId: "G-BT3KQ2JDV9"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;