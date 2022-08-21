/* eslint-disable jsx-a11y/img-redundant-alt */
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileTemplate } from "./userProfileTemplate";
import { EditProfileTemplate } from "./editProfileTemplate";
import { getImgFromURL } from "../functions/getImgFromURL";
import { ref, uploadBytes } from "firebase/storage";
import { submitProfile } from "../functions/submitProfile";

export const Profile = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const user = useSelector((state) => state.user[0]);
  const [uploadImage, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState("");
  const [message, setMessage] = useState("");
  const [exUsers, setexUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (user === 0) {
      navigate("/login");
    }
    const getuser = async () => {
      getImgFromURL(user.profilePic, setImg, setLoading);
      const userCollectionRef = collection(db, "users");
      const data = await getDocs(userCollectionRef);
      setTimeout(() => {
        setexUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.uid })));
      }, 1000);
    };
    getuser();
    //eslint-disable-next-line
  }, []);

  let phoneCheck;

  const checkPhone = (input) => {
    exUsers.forEach((element) => {
      if (element.number === input) {
        phoneCheck = true;
      }
    });
  };
  const uploadImageFunc = async () => {
    if (uploadImage == null) return;
    const imageRef = ref(storage, `/profilePhotos/${user.id}`);
    try {
      await uploadBytes(imageRef, uploadImage);
      alert("Image Uploaded successfully");
    } catch (error) {
      alert("Some error occurred");
    }
  };

  async function submit(values) {
    await submitProfile(
      phoneCheck,
      checkPhone,
      values,
      user,
      uploadImage,
      setShow,
      setMessage,
      uploadImageFunc,
      dispatch
    );
  }
  return show ? (
    <EditProfileTemplate
      user={user}
      img={img}
      setImg={setImg}
      setImageUpload={setImageUpload}
      message={message}
      setShow={setShow}
      submit={submit}
    />
  ) : (
    <UserProfileTemplate
      user={user}
      img={img}
      showImage={showImage}
      setShowImage={setShowImage}
      loading={loading}
      setShow={setShow}
    />
  );
};
