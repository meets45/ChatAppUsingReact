import React from "react";
import { Link } from "react-router-dom";
import { ImageModal } from "./ImageModal";
import profile from "../assets/profile.png";
import profileBackground from "../assets/drip.png";

export const UserProfileTemplate = ({
  user,
  img,
  showImage,
  setShowImage,
  loading,
  setShow,
}) => {
  return (
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
                <ImageModal
                  showImage={showImage}
                  setShowImage={setShowImage}
                  img={img}
                  loading={loading}
                />
                <img
                  src={loading ? profile : img}
                  alt=""
                  className="img-fluid mb-2 my-5 cursor"
                  title="View Profile Photo"
                  style={{
                    width: "8rem",
                    height: "8rem",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    setShowImage(true);
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
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <img className="img-fluid" src={profileBackground} alt="" />
        </div>
      </div>
    </div>
  );
};
