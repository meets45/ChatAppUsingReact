import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

export const onEnterPress = async (
  event,
  text,
  user1,
  user2,
  id,
  setText,
  shareImg,
  setShareImg
) => {
  if (event.key === "Enter" && text.length > 0) {
    await setDoc(doc(db, `chats/${id}/members`, user1), {
      addedAt: new Date().toLocaleString(),
      role: "admin",
      uid: user1,
    });
    await setDoc(doc(db, `chats/${id}/members`, user2), {
      addedAt: new Date().toLocaleString(),
      role: "member",
      uid: user2,
    });
    await setDoc(doc(db, "chats", id), {
      createdAt: new Date().toLocaleString(),
      createdBy: user1,
      groupName: "",
      id: id,
      isGroup: false,
    });
    await setDoc(doc(db, `users/${user1}/groups/`, id), {
      readAt: "unread",
      isGroup: false,
    });
    await setDoc(doc(db, `users/${user2}/groups/`, id), {
      readAt: "unread",
      isGroup: false,
    });
    let url;
    if (shareImg) {
      const shareImgRef = ref(
        storage,
        `images/${new Date().getTime()}/${shareImg.name}`
      );
      const snap = await uploadBytes(shareImgRef, shareImg);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }
    await addDoc(collection(db, "chats", id, "messages"), {
      messageType: "TEXT",
      text: text,
      sentBy: user1,
      sentTo: user2,
      addedOn: Date.now(),
      media: url || "",
    });
    setText("");
    setShareImg("");
  }
};
