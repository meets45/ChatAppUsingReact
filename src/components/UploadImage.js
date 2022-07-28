import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { storage } from "../firebaseConfig";

export const UploadImage = ({ setImgBtn }) => {
  const [uploadImage, setImageUpload] = useState(null);
  const user = useSelector((state) => state.user[0]);

  const uploadImageFunc = async () => {
    if (uploadImage == null) return;
    const imageRef = ref(storage, `/profilePhotos/${user.uid}`);
    try {
      await uploadBytes(imageRef, uploadImage);
      alert("Image Uploaded successfully");
      setTimeout(() => {
        setImgBtn(false);
      }, 2000);
    } catch (error) {
      setImgBtn(false);
      alert("Some error occurred");
    }
  };

  return (
    <div className="d-flex align-items-baseline w-100 mt-2">
      <label className="w-75 fs-6">Select a Profile Photo</label>
      <input
        type="file"
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}
        accept=".jpg, .png, .jpeg"
        className="w-100"
      />
      <div className="d-flex justify-content-end mt-2">
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadImageFunc}
          style={{ backgroundColor: "#6C63FF" }}
        >
          Upload
        </button>
      </div>
    </div>
  );
};
