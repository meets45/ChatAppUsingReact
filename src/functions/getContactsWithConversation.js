import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getContactsWithConversation = (
  commonGroups,
  setContactlist,
  contactList
) => {
  let users = [];
  commonGroups.forEach(async (user) => {
    const userCollectionRef = doc(db, "users", user);
    const data = await getDoc(userCollectionRef);
    users.push(data.data());
  });
  setContactlist(users);
  console.log(contactList);
};
