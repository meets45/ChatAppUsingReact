import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getCommonGroups = async (user) => {
  let groups = [];
  await Promise.all(
    user.groups.map(async (id) => {
      const userCollectionRef = collection(db, "chats", id, "members");
      const data = await getDocs(userCollectionRef);
      await Promise.all(
        data.docs.map((doc) => {
          if (doc.id !== user.id) {
            groups.push(doc.id);
          }
          return "";
        })
      );
      return "";
    })
  );
  return groups;
};
