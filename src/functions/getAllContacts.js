import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getAllContacts = (user, navigate, setContacts) => {
  if (user === 0) {
    navigate("/login");
  } else {
    const userCollectionRef = collection(db, "users");
    const q = query(userCollectionRef, where("id", "not-in", [user.uid]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setContacts(users);
    });
    return () => unsub();
  }
};
