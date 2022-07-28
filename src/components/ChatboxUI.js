import {
  ChatBox,
  ChatBoxContainer,
  ChatInput,
  EmojiIcon,
} from "./ConversationComponents";
import Picker from "emoji-picker-react";
import React, { useState } from "react";
import { onEnterPress } from "../functions/onEnterPress";

export const ChatBoxUI = (user1, user2, id) => {
  const [text, setText] = useState("");
  const [picker, setPicker] = useState(false);
  const [shareImg, setShareImg] = useState("");

  const onEmojiClick = (event, emojiObj) => {
    setText(text + emojiObj.emoji);
  };

  return (
    <ChatBox>
      {picker && (
        <Picker
          onEmojiClick={onEmojiClick}
          pickerStyle={{ position: "absolute", bottom: "60px" }}
        />
      )}
      <EmojiIcon>
        <i
          className="fa-regular fa-face-grin-wide fs-4"
          onClick={() => setPicker(!picker)}
        ></i>
      </EmojiIcon>
      <EmojiIcon>
        <div className="d-flex justify-content-center">
          <span>
            <label htmlFor="formId" className="mb-0">
              <input
                name=""
                type="file"
                id="formId"
                accept=".jpg, .png, .gif"
                hidden
                onChange={(e) => {
                  setShareImg(e.target.files[0]);
                }}
              />
              <span className="c-pointer">
                <span className="icon-edit-text">
                  <i className="fa-solid fa-paperclip fs-4"></i>
                </span>
              </span>
            </label>
          </span>
        </div>
      </EmojiIcon>
      <ChatBoxContainer>
        <ChatInput
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(event) => {
            onEnterPress(
              event,
              text,
              user1,
              user2,
              id,
              setText,
              shareImg,
              setShareImg
            );
          }}
        />
      </ChatBoxContainer>
    </ChatBox>
  );
};
