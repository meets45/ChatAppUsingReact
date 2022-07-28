import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ContactList } from "../components/ContactList";
import { Conversation } from "../components/Conversation";
import placeholder from "../assets/placeholder.jpeg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const MainScreen = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100%;
    background: #f8f8f8;
  `;
  const PlaceHolder = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    gap: 10px;
    color: rgba(0, 0, 0, 0.5);
  `;
  const PlaceHolderImage = styled.img`
    height: 240px;
    width: 240px;
    border-radius: 50%;
    object-fit: contain;
  `;
  const PlaceHolderText = styled.div`
    font-size: 32px;
    color: #525252;
  `;
  const [selectedChat, setSelectedChat] = useState();
  useEffect(() => {
    if (user[0] === 0) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Container>
      <ContactList setSelectedChat={setSelectedChat} />
      {selectedChat ? (
        <Conversation selectedChat={selectedChat} />
      ) : (
        <PlaceHolder>
          <PlaceHolderImage src={placeholder} />
          <PlaceHolderText>Keep Your Phone Connected</PlaceHolderText>
          WhatsApp connects to your phone to sync messages
        </PlaceHolder>
      )}
    </Container>
  );
};
