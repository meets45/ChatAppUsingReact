import React from "react";
import { ContactIcon } from "./ConversationComponents";
import profile from "../assets/profile.png";

export const ImageModal = ({ showImage, setShowImage, img, loading }) => {
  let imgModal = showImage ? (
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
          <div className="modal-header" style={{ borderBottom: "none" }}>
            <button
              type="button"
              className="btn-close"
              style={{ backgroundColor: "#ffffff" }}
              onClick={() => setShowImage(false)}
            ></button>
          </div>
          <div className="modal-body" style={{ border: "none" }}>
            <div className="row">
              <div className="d-flex justify-content-center align-items-center">
                <ContactIcon src={loading ? profile : img} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return imgModal;
};
