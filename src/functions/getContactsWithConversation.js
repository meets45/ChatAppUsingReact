import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getContactsWithConversation = async (commonGroups) => {
  let users = [];
  await Promise.all(
    commonGroups.map(async (user) => {
      const userCollectionRef = doc(db, "users", user);
      const data = await getDoc(userCollectionRef);
      users.push(data.data());
      return "";
    })
  );
  return users;
};
