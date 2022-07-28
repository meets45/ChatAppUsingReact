/* eslint-disable jsx-a11y/img-redundant-alt */
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import validateEdit from "../functions/validateEdit";
import { DatePicker } from "./DatePicker";
import { actionCreators } from "../state/index";
import { useEffect, useState } from "react";
import profileBackground from "../assets/fluid.png";
import profileEditBackground from "../assets/liquid.png";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const Profile = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const user = useSelector((state) => state.user[0]);
  const imgRef = ref(storage, `profilePhotos/${user.profilePic}`);
  const [uploadImage, setImageUpload] = useState(null);
  const [img, setImg] = useState([]);
  const [message, setMessage] = useState("");
  const [exUsers, setexUsers] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user === 0) {
      navigate("/login");
    }
    const getImg = async () => {
      let imgSet = await getDownloadURL(imgRef);
      setImg(imgSet);
    };
    const getUser = async () => {
      const userCollectionRef = collection(db, "users");
      const data = await getDocs(userCollectionRef);
      setTimeout(() => {
        setexUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.uid })));
      }, 1000);
    };
    getImg();
    getUser();
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
        await uploadImageFunc();
        let user_data = data;
        user_data.uid = user.uid;
        dispatch(actionCreators.signInfunc(user_data));
        setShow(false);
      } else {
        setMessage(
          "Phone number is already registered, please use other number"
        );
      }
    } catch (error) {
      console.log(error);
      setMessage("Some error occurred");
    }
  }
  let infoTemplate = (
    <div className="container py-5 h-100 mt-5">
      <div className="row d-flex justify-content-center align-items-center ">
        <div className="col col-md-6 mb-4">
          <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
            <div className="row g-0">
              <div
                className="col-md-4 gradient-custom text-center text-white"
                style={{
                  borderTopLeftRadius: ".5rem",
                  borderBottomLeftRadius: ".5rem",
                }}
              >
                <img
                  src={img}
                  alt="No Photo"
                  className="img-fluid mb-2 my-5"
                  style={{
                    width: "8rem",
                    height: "8rem",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
                <h5>{user.username}</h5>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShow(true);
                  }}
                  className="fs-6"
                >
                  Edit
                  <i className="ms-2 far fa-edit mb-5"></i>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body p-4">
                  <h6>Contact Details</h6>
                  <hr className="mt-0 mb-3" />
                  <div className="row pt-1">
                    <div className="col-12">
                      <h6>Email</h6>
                      <p className="text-muted">{user.email}</p>
                    </div>
                    <div className="col-12 mb-2">
                      <h6>Phone</h6>
                      <p className="text-muted">{user.number}</p>
                    </div>
                  </div>
                  <h6>Personal Information</h6>
                  <hr className="mt-0 mb-4" />
                  <div className="row">
                    <div className="col-6">
                      <h6>Name</h6>
                      <p className="text-muted">
                        {user.firstname + " " + user.lastname}
                      </p>
                    </div>
                    <div className="col-6 mb-2">
                      <h6>Birthdate</h6>
                      <p className="text-muted">{user.date}</p>
                    </div>
                  </div>

                  <div className="text-left">
                    <Link
                      to="/"
                      className="text-decoration-none"
                      style={{ color: "#6C63FF" }}
                    >
                      Go back to Chats
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img className="img-fluid" src={profileBackground} alt="" />
        </div>
      </div>
    </div>
  );
  let editTemplate = (
    <>
      <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={{
              firstname: user.firstname,
              lastname: user.lastname,
              username: user.username,
              number: user.number,
              date: user.date,
            }}
            validationSchema={validateEdit}
            onSubmit={(values) => {
              submit(values);
            }}
          >
            {(formik) => (
              <div>
                <h1 className="my-4 font-weight-bold display-6">
                  Edit Profile
                </h1>
                <Form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="d-flex justify-content-center">
                        <span>
                          <label
                            htmlFor="formId"
                            className="mb-0"
                            onChange={(e) => {
                              setImg(URL.createObjectURL(e.target.files[0]));
                              setImageUpload(e.target.files[0]);
                            }}
                          >
                            <input
                              name=""
                              type="file"
                              id="formId"
                              hidden
                              accept="image/png, image/jpeg"
                            />
                            <span className="c-pointer">
                              <span className="icon-edit-text">
                                <img
                                  src={img}
                                  alt="No Photo"
                                  className="img-fluid mb-2 cursor"
                                  style={{
                                    width: "9rem",
                                    height: "9rem",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                  }}
                                />
                              </span>
                              <i className="c-icon c-icon--edit-red" />
                            </span>
                          </label>
                        </span>
                        <label
                          className="fa fa-edit cursor fs-4 text-warning"
                          style={{
                            position: "absolute",
                            marginTop: "115px",
                          }}
                          htmlFor="formId"
                          title="Edit Profile"
                        ></label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="row">
                        <TextField
                          label="Firstname"
                          name="firstname"
                          type="text"
                        />
                      </div>
                      <div className="row">
                        <TextField
                          label="Lastname"
                          name="lastname"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <TextField label="Username" name="username" type="text" />
                  <TextField name="number" type="number" label="Phone number" />
                  <DatePicker name="date" age={formik.values.age} />
                  <div className="d-flex justify-content-center text-center">
                    <label className="error big my-3">{message}</label>
                    <button
                      className="btn btn-success mt-5 w-75"
                      type="submit"
                      style={{ backgroundColor: "#6C63FF" }}
                    >
                      <b>Update</b>
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <Link
                      to="/changePass"
                      className="text-decoration-none"
                      style={{ color: "#6C63FF" }}
                    >
                      Do you want to change password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <label
                      className="btn btn-link text-decoration-none"
                      style={{ color: "#6C63FF" }}
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      Go back to Profile
                    </label>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6 my-auto">
          <img className="img-fluid" src={profileEditBackground} alt="" />
        </div>
      </div>
    </>
  );
  return show ? editTemplate : infoTemplate;
};
