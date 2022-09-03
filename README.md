# ChatAppUsingReact
Chat Application created with React and Firebase(WhatsApp Clone)
It has functionality such as SignUp/ SignIn of user using Email Address and user can Chat with each other in realtime. User can share Images.

Note: _This app is not responsive._

## To use this app
1. Clone the repository
2. Run ```npm install``` command to install packages
3. In src directory create a "firebaseConfig.js" file and copy your firebase config code.

firebaseConfig.js
```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YourAPIKey",
  authDomain: "YourAuthDomain",
  projectId: "YourProjectID",
  storageBucket: "YourStorageBucket",
  messagingSenderId: "YourMessagingSenderID",
  appId: "YourAppID",
  measurementId: "YourMeasurementID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
```
Preview of app: https://whatsapp-v2.netlify.app
