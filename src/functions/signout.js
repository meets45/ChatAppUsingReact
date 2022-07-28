import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const signout = async () => {
  await signOut(auth);
};

export default signout;
