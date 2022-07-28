import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getMessages = (id, setMessageList) => {
  const msgRef = collection(db, "chats", id, "messages");
  const q = query(msgRef, orderBy("addedOn", "asc"));
  onSnapshot(q, (querySnapshot) => {
    let msgs = [];
    querySnapshot.forEach((doc) => {
      msgs.push(doc.data());
    });
    setMessageList(msgs);
  });
};
