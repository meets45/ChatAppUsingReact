import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 1.6;
`;

const SearchBox = styled.div`
  background: #f6f6f6;
  display: flex;
  padding: 10px;
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 8px;
  width: 100%;
  padding: 5px 10px;
`;

const SearchIcon = styled.div`
  height: 25px;
  width: 25px;
`;
const SearchInput = styled.input`
  width: 100%;
  border: none;
  margin-left: 10px;
  outline: none;
  font-size: 15px;
`;
const ContactItem = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f2f2f2;
  background: white;
  cursor: pointer;
  width: 100%;
  padding: 12px 12px;
  :hover {
    background: #ebebeb;
  }
`;
const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 12px;
`;
const ContactName = styled.span`
  width: 100%;
  font-size: 16px;
  color: black;
`;
const MessageText = styled.span`
  width: 100%;
  font-size: 14px;
  margin-top: 3px;
  color: rgba(0, 0, 0, 0.8);
`;
const MessageTime = styled.span`
  font-size: 12px;
  margin-right: 10px;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.5);
`;

export {
  Container,
  MessageTime,
  MessageText,
  ContactName,
  ContactInfo,
  ProfileIcon,
  ContactItem,
  SearchInput,
  SearchIcon,
  SearchContainer,
  SearchBox,
};
