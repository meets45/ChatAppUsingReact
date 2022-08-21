import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { actionCreators } from "../state/index";

export const submitProfile = async (
  phoneCheck,
  checkPhone,
  values,
  user,
  uploadImage,
  setShow,
  setMessage,
  uploadImageFunc,
  dispatch
) => {
  try {
    phoneCheck = false;
    checkPhone(values.number);
    if (!phoneCheck || user.number === values.number) {
      const doc1 = doc(db, "users", user.uid);
      let data = {
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        id: user.id,
        accountCreated: user.accountCreated,
        email: user.email,
        profilePic: user.id,
        number: values.number,
        date: values.date,
      };
      await setDoc(doc1, data);
      await uploadImageFunc(uploadImage, user);
      let user_data = data;
      user_data.uid = user.uid;
      user_data.groups = user.groups;
      dispatch(actionCreators.signInfunc(user_data));
      setShow(false);
    } else {
      setMessage("Phone number is already registered, please use other number");
    }
  } catch (error) {
    console.log(error);
    setMessage("Some error occurred");
  }
};
