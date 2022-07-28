import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const signin = async (email, password) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export default signin;
