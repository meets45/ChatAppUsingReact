import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const getImgFromURL = async (data, setImg) => {
  const imgRef = ref(storage, `profilePhotos/${data}`);
  let imgSet = await getDownloadURL(imgRef);
  setImg(imgSet);
};
