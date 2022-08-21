import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllContacts } from "../functions/getAllContacts";
import { getImgFromURL } from "../functions/getImgFromURL";
import {
  ContactInfo,
  ContactItem,
  ContactName,
  ProfileIcon,
} from "./ContactListComponents";
import profile from "../assets/profile.png";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { ref } from "yup";
import { uploadBytes } from "firebase/storage";

export const GroupModal = ({ showGroupModal, setShowGroupModal }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user[0]);
  const [contacts, setContacts] = useState([]);
  const [img, setImg] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [groupName, setGroupName] = useState("");

  const uploadImageFunc = async (id) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `/profilePhotos/${id}`);
    try {
      await uploadBytes(imageRef, imageUpload);
      alert("Image Uploaded successfully");
    } catch (error) {
      alert("Some error occurred");
    }
  };

  useEffect(() => {
    getAllContacts(user, navigate, setContacts);
    //eslint-disable-next-line
  }, []);
  let udata = [];

  const ContactComponent = (props) => {
    const { data } = props;
    const [img, setImg] = useState([]);
    const [loading, setLoading] = useState(true);

    getImgFromURL(data.profilePic, setImg, setLoading);
    data.name = data.firstname + " " + data.lastname;
    return (
      <ContactItem>
        <ProfileIcon src={loading ? profile : img} />
        <ContactInfo>
          <label htmlFor={`selectedUsers${data.id}`} className="cursor">
            <ContactName>{data.name}</ContactName>
          </label>
        </ContactInfo>
        <div className="d-flex justify-content-end">
          <input
            id={`selectedUsers${data.id}`}
            type="checkbox"
            name="users"
            value={data}
            onChange={() => udata.push(data)}
          />
        </div>
      </ContactItem>
    );
  };
  const display = async () => {
    const data = await addDoc(collection(db, `users/${user.id}/groups/`), {
      readAt: "unread",
      isGroup: true,
    });
    udata.forEach(async (user) => {
      await setDoc(doc(db, `users/${user.id}/groups/`, data.id), {
        readAt: "unread",
        isGroup: true,
      });
      await setDoc(doc(db, `chats/${data.id}/members`, user.id), {
        addedAt: new Date().toLocaleString(),
        role: "member",
        uid: user.id,
      });
    });

    await setDoc(doc(db, `chats/${data.id}/members`, user.id), {
      addedAt: new Date().toLocaleString(),
      role: "admin",
      uid: user.id,
    });

    await setDoc(doc(db, "chats", data.id), {
      createdAt: new Date().toLocaleString(),
      createdBy: user.id,
      groupName: groupName,
      id: data.id,
      isGroup: true,
    });
    uploadImageFunc(data.id);
    setGroupName("");
    setImg("");
    setImageUpload("");
    udata = [];
    setShowGroupModal(false);
  };

  let groupModal = (
    <div
      className="modal fade show"
      tabIndex="-1"
      id="exampleModal3"
      style={{ display: "block", backgroundColor: "rgba(18, 18, 18, 0.5)" }}
    >
      <div className="modal-dialog">
        <div
          className="modal-content"
          style={{
            animationDuration: "0.3s",
            animationName: "animate-pop",
            animationTimingFunction: "cubic-bezier(.26, .53, .74, 1.48)",
          }}
        >
          <div
            className="modal-header"
            style={{ borderBottom: "1px solid #626262" }}
          >
            <h5 className="modal-title" id="exampleModalLabel3">
              Create a new Group
            </h5>
            <button
              type="button"
              className="btn-close"
              style={{ backgroundColor: "#ffffff" }}
              onClick={() => setShowGroupModal(false)}
            ></button>
          </div>
          <div className="modal-body d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center align-items-center">
              <input
                type="text"
                placeholder="Enter Group Name"
                className="p-2 custom-tb w-50 me-5"
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
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
                        src={img === "" ? profile : img}
                        alt=""
                        className="img-fluid mb-2 cursor"
                        style={{
                          width: "9rem",
                          height: "9rem",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </span>
                  </span>
                </label>
              </span>
              <label
                className="fa fa-edit cursor fs-4 text-light"
                style={{
                  position: "absolute",
                  marginTop: "95px",
                  marginLeft: "280px",
                }}
                htmlFor="formId"
                title="Edit Profile Photo"
              ></label>
            </div>
            <div className="scroll">
              {contacts.map((data) => (
                <ContactComponent data={data} key={data.id} />
              ))}
            </div>
          </div>
          <div
            className="modal-footer d-flex flex-row justify-content-center"
            style={{ borderTop: "none" }}
          >
            <button
              className="btn btn-primary"
              onClick={() => display()}
              disabled={udata.length < 0}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return showGroupModal ? groupModal : null;
};
