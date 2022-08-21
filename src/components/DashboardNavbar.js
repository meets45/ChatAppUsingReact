import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getImgFromURL } from "../functions/getImgFromURL";
import signout from "../functions/signout";
import { actionCreators } from "../state/index";
import profile from "../assets/profile.png";
import { GroupModal } from "./GroupModal";

export const DashboardNavbar = (props) => {
  const user = useSelector((state) => state.user[0]);
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignout = () => {
    try {
      signout();
      dispatch(actionCreators.signOutfunc(user));
      navigate("/login");
    } catch {
      alert("SignOut Unsuccessful");
    }
  };

  useEffect(() => {
    if (user === 0) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  getImgFromURL(user.profilePic, setImg, setLoading);
  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "#ededed" }}>
      <GroupModal
        showGroupModal={showGroupModal}
        setShowGroupModal={setShowGroupModal}
      />
      <div className="container-fluid">
        <Link
          className="nav-link active fs-6"
          aria-current="page"
          to="/profile"
        >
          <img
            src={loading ? profile : img}
            alt=""
            className="img-fluid"
            style={{
              width: "2.3rem",
              height: "2.3rem",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            title="View Profile"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex align-items-center justify-start-end ms-3"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <i
                className="fa-solid fa-right-from-bracket fs-4 cursor"
                onClick={handleSignout}
                title="Logout"
              ></i>
            </li>
          </ul>
        </div>
        <span className="justify-content-end align-items-center">
          <i
            className="fa-solid fa-user-group fs-5 me-3 cursor"
            onClick={() => {
              setShowGroupModal(true);
            }}
            title="Create Group"
          ></i>
          <i
            className="fa-regular fa-address-book fs-4 cursor me-1"
            onClick={() => {
              props.setShowContacts(!props.showContacts);
            }}
            title="Show Contacts"
          ></i>
        </span>
      </div>
    </nav>
  );
};
