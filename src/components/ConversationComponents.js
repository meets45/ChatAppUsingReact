import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 3;
  background: #f6f7f8;
`;
const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 8px;
  align-items: center;
  gap: 10px;
  border-left: 1px solid #f8f8f8;
`;
const ProfileIcon = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;
const ContactIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const ChatBox = styled.div`
  display: flex;
  background: #f0f0f0;
  padding: 10px;
  bottom: 0;
  align-items: center;
`;
const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 8px;
  width: 100%;
  padding: 5px 10px;
`;

const ChatInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  margin-left: 5px;
  font-size: 15px;
`;
const EmojiIcon = styled.div`
  display: flex;
  height: 35px;
  width: 35px;
  opacity: 0.4;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  align-items: center;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #e5ddd6;
  overflow-y: auto;
`;
const MessageTime = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
  opacity: 0.7;
`;

export {
  MessageTime,
  MessageContainer,
  EmojiIcon,
  ChatInput,
  ChatBoxContainer,
  ChatBox,
  ProfileHeader,
  ContactIcon,
  ProfileIcon,
  Container,
};
