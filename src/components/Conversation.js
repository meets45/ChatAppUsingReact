import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {
  ChatBox,
  ChatBoxContainer,
  ChatInput,
  Container,
  EmojiIcon,
  MessageContainer,
  MessageTime,
  ProfileHeader,
  ProfileIcon,
} from './ConversationComponents'
import {useSelector} from 'react-redux'
import {ProfileModal} from './ProfileModal'
import {onEnterPress} from '../functions/onEnterPress'
import {getImgFromURL} from '../functions/getImgFromURL'
import {getDate} from '../functions/basicFunctions'
import {getMessages} from '../functions/getMessages'
import {ImageModal} from './ImageModal'
import profile from '../assets/profile.png'

export const Conversation = (props) => {
  const {selectedChat} = props
  const [text, setText] = useState('')
  const [picker, setPicker] = useState(false)
  const [messageList, setMessageList] = useState([])
  const [img, setImg] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [shareImg, setShareImg] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalImg, setModalImg] = useState('')
  const user = useSelector((state) => state.user[0])
  const scrollRef = useRef()

  const user1 = user.uid
  const user2 = selectedChat.id
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

  useEffect(() => {
    getMessages(id, setMessageList)
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messageList])

  const MessageBlock = styled.div`
    display: flex;
    justify-content: ${(props) => (props.sender ? 'flex-end' : 'flex-start')};
    margin: 5px 15px;
  `
  const Message = styled.div`
    max-width: 50%;
    color: #303030;
    padding: 8px 10px;
    font-size: 14px;
    border-radius: 4px;
    background: ${(props) => (props.sender ? '#daf8cb' : 'white')};
  `

  const onEmojiClick = (event, emojiObj) => {
    setText(text + emojiObj.emoji)
  }

  getImgFromURL(selectedChat.profilePic, setImg, setLoading)

  return (
    <Container>
      <ProfileHeader>
        <ProfileModal
          selectedChat={selectedChat}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          img={img}
        />
        <ImageModal
          showImage={showImage}
          setShowImage={setShowImage}
          img={modalImg}
        />
        <ProfileIcon
          src={loading ? profile : img}
          onClick={() => {
            setShowProfile(true)
          }}
          className='cursor'
        />
        {selectedChat.name}
      </ProfileHeader>
      <MessageContainer>
        {messageList.map((message) => (
          <MessageBlock
            sender={message.sentBy === user.uid}
            ref={scrollRef}
            key={message.addedOn}
          >
            <Message sender={message.sentBy === user.uid}>
              {message.media ? (
                <div className='d-flex justify-content-center mb-2'>
                  <img
                    src={message.media}
                    alt={message.text}
                    className='cursor'
                    onClick={() => {
                      setShowImage(true)
                      setModalImg(message.media)
                    }}
                    width='100%'
                    height='90%'
                  />
                </div>
              ) : null}
              {message.text}
              <MessageTime>{getDate(message.addedOn)}</MessageTime>
            </Message>
          </MessageBlock>
        ))}
      </MessageContainer>
      <ChatBox>
        {picker && (
          <Picker
            onEmojiClick={onEmojiClick}
            pickerStyle={{position: 'absolute', bottom: '60px'}}
          />
        )}
        <EmojiIcon>
          <i
            className='fa-regular fa-face-grin-wide fs-4'
            onClick={() => setPicker(!picker)}
          ></i>
        </EmojiIcon>
        <EmojiIcon>
          <div className='d-flex justify-content-center'>
            <span>
              <label htmlFor='formId' className='mb-0'>
                <input
                  name=''
                  type='file'
                  id='formId'
                  accept='.jpg, .png, .gif'
                  hidden
                  onChange={(e) => {
                    setShareImg(e.target.files[0])
                  }}
                />
                <span className='c-pointer'>
                  <span className='icon-edit-text'>
                    <i className='fa-solid fa-paperclip fs-4 cursor'></i>
                  </span>
                </span>
              </label>
            </span>
          </div>
        </EmojiIcon>
        <ChatBoxContainer>
          <ChatInput
            placeholder='Type a message'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              onEnterPress(
                e,
                text,
                user1,
                user2,
                id,
                setText,
                shareImg,
                setShareImg,
              )
            }}
          />
        </ChatBoxContainer>
      </ChatBox>
    </Container>
  )
}
