import React from "react";
import { ContactIcon } from "./ConversationComponents";

export const ProfileModal = ({
  showProfile,
  setShowProfile,
  selectedChat,
  img,
}) => {
  let addModal = showProfile ? (
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
              {selectedChat.username}'s Profile
            </h5>
            <button
              type="button"
              className="btn-close"
              style={{ backgroundColor: "#ffffff" }}
              onClick={() => setShowProfile(false)}
            ></button>
          </div>
          <div className="modal-body" style={{ border: "none" }}>
            <div className="row">
              <div className="col-md-6 p-2">
                <strong>Name -</strong> {selectedChat.name}
                <br />
                <strong>Username - </strong>
                {selectedChat.username}
                <br />
                <strong>Number - </strong>
                {selectedChat.number}
              </div>
              <div className="d-flex col-md-6 justify-content-center">
                <ContactIcon src={img} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return addModal;
};
