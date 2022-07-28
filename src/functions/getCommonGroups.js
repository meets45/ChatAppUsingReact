import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getCommonGroups = (user, setCommonGroups, commonGroups) => {
  let groups = [];
  user.groups.forEach(async (id) => {
    const userCollectionRef = collection(db, "chats", id, "members");
    const data = await getDocs(userCollectionRef);
    data.docs.forEach((doc) => {
      if (doc.id !== user.id) {
        groups.push(doc.id);
      }
    });
  });
  setCommonGroups(groups);
  console.log(commonGroups);
};
