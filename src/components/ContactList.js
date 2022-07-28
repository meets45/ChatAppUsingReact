import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardNavbar } from "../components/DashboardNavbar";
import {
  ContactInfo,
  ContactItem,
  ContactName,
  Container,
  ProfileIcon,
  SearchBox,
  SearchContainer,
  SearchIcon,
  SearchInput,
} from "./ContactListComponents";
import { useNavigate } from "react-router-dom";
import { getAllContacts } from "../functions/getAllContacts";
import { getCommonGroups } from "../functions/getCommonGroups";
import { getContactsWithConversation } from "../functions/getContactsWithConversation";
import { getImgFromURL } from "../functions/getImgFromURL";
import profile from "../assets/profile.png";

export const ContactList = (props) => {
  const user = useSelector((state) => state.user[0]);
  const [showContacts, setShowContacts] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactList, setContactlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllContacts(user, navigate, setContacts);
    const getContacts = async () => {
      const commonGroups = await getCommonGroups(user);
      const contactsResponse = await getContactsWithConversation(commonGroups);
      setContactlist(contactsResponse);
    };
    getContacts();
    //eslint-disable-next-line
  }, []);
  const ContactComponent = (props) => {
    const { data, setSelectedChat } = props;
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(true);
    getImgFromURL(data.profilePic, setImg, setLoading);
    data.name = data.firstname + " " + data.lastname;
    return (
      <ContactItem onClick={() => setSelectedChat(data)}>
        <ProfileIcon src={loading ? profile : img} />
        <ContactInfo>
          <ContactName>{data.name}</ContactName>
          {/* <MessageText>{msg?.text}</MessageText> */}
        </ContactInfo>
        {/* <MessageTime>{msg?.addedOn}</MessageTime> */}
      </ContactItem>
    );
  };

  const ContactListComponent = (props) => {
    const { data, setSelectedChat } = props;
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(true);
    getImgFromURL(data.profilePic, setImg, setLoading);
    data.name = data.firstname + " " + data.lastname;
    return (
      <ContactItem onClick={() => setSelectedChat(data)} key={data.name}>
        <ProfileIcon src={loading ? profile : img} />
        <ContactInfo>
          <ContactName>{data.name}</ContactName>
          {/* <MessageText>{msg?.text}</MessageText> */}
        </ContactInfo>
        {/* <MessageTime>{msg?.addedOn}</MessageTime> */}
      </ContactItem>
    );
  };

  return (
    <>
      <Container>
        <DashboardNavbar
          setShowContacts={setShowContacts}
          showContacts={showContacts}
        />
        <SearchBox>
          <SearchContainer>
            <SearchIcon>
              <i className="fa-solid fa-magnifying-glass"></i>
            </SearchIcon>
            <SearchInput placeholder="Search or start a new chat" />
          </SearchContainer>
        </SearchBox>
        {!showContacts
          ? contactList.map((data) => (
              <ContactComponent
                data={data}
                key={data.id}
                setSelectedChat={props.setSelectedChat}
              />
            ))
          : contacts.map((data) => (
              <ContactListComponent
                data={data}
                key={data.id}
                setSelectedChat={props.setSelectedChat}
              />
            ))}
      </Container>
    </>
  );
};
