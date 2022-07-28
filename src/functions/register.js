import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const register = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

export default register;
