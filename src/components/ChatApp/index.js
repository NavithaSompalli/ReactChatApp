import {Component} from 'react'
import EmojiPicker from 'emoji-picker-react'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import {AiOutlinePlusCircle, AiOutlineCloseCircle} from 'react-icons/ai'
import {FaHashtag, FaUserCircle} from 'react-icons/fa'

import {GrEmoji} from 'react-icons/gr'
import {FcLike} from 'react-icons/fc'

import './index.css'

const userList = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin']
const colors = ['#874d41', '#4d6643', '#4d7d6f', '#ad5e7f', '#3d5369']

class ChatApp extends Component {
  state = {
    textInput: '',
    messagesList: [],
    count: 0,
    isEmojiIconActive: false,
    likeCount: 0,
    isAtTheDateActive: false,
  }

  onChangeMessage = event => {
    this.setState({textInput: event.target.value})
  }

  handleKeyPress = event => {
    const {messagesList, textInput, count, likeCount} = this.state
    const userName = userList[Math.floor(Math.random() * userList.length)]
    const colorName = colors[Math.floor(Math.random() * colors.length)]
    const date = new Date()
    let hours = date.getHours()
    let timeType = ''
    if (hours > 12) {
      hours -= 12
    }

    if (hours <= 11) {
      timeType = 'am'
    } else {
      timeType = 'pm'
    }

    const minutes = date.getMinutes()
    console.log(date)
    if (event.key === 'Enter') {
      const message = {
        id: count,
        msg: textInput,
        name: userName,
        date: `${hours} : ${minutes} ${timeType}`,
        colorName,
        likeCount,
      }
      this.setState({
        messagesList: [...messagesList, message],
      })
      this.setState({textInput: ''})
      this.setState(prevState => ({count: prevState.count + 1}))
    }
  }

  onEmojiClick = event => {
    console.log(event.emoji)
    this.setState(prevState => ({textInput: prevState.textInput + event.emoji}))
  }

  onClickEmojiIcon = () => {
    this.setState(prevState => ({
      isEmojiIconActive: !prevState.isEmojiIconActive,
    }))
  }

  onClickLikeButton = () => {
    this.setState(prevState => ({likeCount: prevState.likeCount + 1}))
  }

  onClickAtTheDateButton = () => {
    this.setState(prevState => ({
      isAtTheDateActive: !prevState.isAtTheDateActive,
    }))
  }

  render() {
    const {
      textInput,
      messagesList,
      isEmojiIconActive,
      likeCount,
      isAtTheDateActive,
    } = this.state

    return (
      <div className="chat-app-container">
        <nav className="nav-side-bar">
          <div className="nav-user-icon-container">
            <div className="icon-container">
              <h1 className="user-icon">RR</h1>
            </div>
            <div>
              <p className="nav-user-name">Ronalde Raimondi</p>
              <p className="designation">Research Nurse</p>
            </div>
          </div>
          <div className="conversations-heading-container">
            <p className="conversation-heading">Conversations</p>
            <AiOutlinePlusCircle className="plus-icon" />
          </div>
          <div className="heading-container">
            <FaHashtag className="hash-icon" />
            <p className="conversation-name">Poland Office</p>
          </div>
          <div className="introduction-heading-container">
            <FaHashtag className="introduction-hash-icon" />
            <p className="introduction-conversation-name">Introductions</p>
          </div>
          <div className="heading-container">
            <FaHashtag className="hash-icon" />
            <p className="conversation-name">India Office</p>
          </div>
        </nav>
        <div className="chat-box-container">
          <nav className="chat-box-nav-container">
            <div>
              <h1>Introductions</h1>
              <p>This Channel Is For Company Wide Chatter</p>
            </div>

            <div className="nav-user-account-icon-container">
              <FaUserCircle className="user-account-icon" />
            </div>
          </nav>
          {isAtTheDateActive ? (
            <ul className="messages-container-list">
              {userList.map(userName => (
                <li key={userName} className="list-item">
                  <div className="user-details">
                    <div className="user-icon-container">
                      <h1 className="user-icon">{userName[0]}</h1>
                    </div>
                    <p className="user-name">{userName}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="messages-container-list">
              {messagesList.map(user => (
                <li key={user.id} className="list-item">
                  <div className="user-details">
                    <div
                      className="user-icon-container"
                      style={{backgroundColor: user.colorName}}
                    >
                      <h1 className="user-icon">{user.name[0]}</h1>
                    </div>
                    <p className="user-name">{user.name}</p>
                    <p className="message-send-time">{user.date}</p>
                  </div>
                  {user.msg.length !== 0 && (
                    <span className="message-container">
                      <span className="message">{user.msg}</span>
                      <button
                        type="button"
                        className="like-button"
                        onClick={() => this.onClickLikeButton(user.id)}
                      >
                        <FcLike />
                      </button>
                      <span>{likeCount}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="input-container">
            <button
              type="button"
              onClick={this.onClickAtTheDateButton}
              className="at-the-date-btn"
            >
              @
            </button>
            <input
              type="text"
              placeholder="Type Message"
              className="input-text-field"
              value={textInput}
              onChange={this.onChangeMessage}
              onKeyPress={this.handleKeyPress}
            />
            {isEmojiIconActive ? (
              <div className="popup-container">
                <Popup
                  contentStyle={{width: '29%'}}
                  modal
                  trigger={
                    <button
                      type="button"
                      className="emoji-button"
                      onClick={this.onClickEmojiIcon}
                    >
                      <GrEmoji />
                    </button>
                  }
                  position="center center"
                >
                  {close => (
                    <>
                      {' '}
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        <AiOutlineCloseCircle />
                      </button>
                      <div className="emoji-picker">
                        <EmojiPicker
                          onEmojiClick={this.onEmojiClick}
                          theme="dark"
                        />
                      </div>
                    </>
                  )}
                </Popup>
              </div>
            ) : (
              <button
                type="button"
                className="emoji-button"
                onClick={this.onClickEmojiIcon}
              >
                <GrEmoji />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default ChatApp
