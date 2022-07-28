import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2zC8jxT4qcMYCEi6rdSSsJTdrRx1sOxU",
  authDomain: "realtime-chat-app-reactjs.firebaseapp.com",
  projectId: "realtime-chat-app-reactjs",
  storageBucket: "realtime-chat-app-reactjs.appspot.com",
  messagingSenderId: "773146293443",
  appId: "1:773146293443:web:5da3deb144618ba51c1e76",
  measurementId: "G-38YZVS007K",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
