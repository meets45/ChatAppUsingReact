import { getDownloadURL, ref } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../firebaseConfig";
import signout from "../functions/signout";
import { actionCreators } from "../state/index";

export const DashboardNavbar = (props) => {
  const user = useSelector((state) => state.user[0]);
  const [img, setImg] = useState([]);
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

  const imgRef = ref(storage, `profilePhotos/${user.profilePic}`);
  const getImg = async () => {
    let imgSet = await getDownloadURL(imgRef);
    setImg(imgSet);
  };
  getImg();
  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "#ededed" }}>
      <div className="container-fluid">
        <Link
          className="nav-link active fs-6"
          aria-current="page"
          to="/profile"
        >
          <img
            src={img}
            alt=""
            className="img-fluid"
            style={{
              width: "2.3rem",
              height: "2.3rem",
              objectFit: "cover",
              borderRadius: "50%",
            }}
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
        <span className="justify-content-end">
          <i
            className="fa-regular fa-address-book fs-3 cursor me-1"
            onClick={() => {
              props.setShowContacts(!props.showContacts);
            }}
          ></i>
        </span>
      </div>
    </nav>
  );
};
