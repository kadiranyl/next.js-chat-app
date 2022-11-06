import Image from "next/image"
import { AiOutlinePaperClip, AiTwotoneAudio } from 'react-icons/ai'
import { FaPhoneAlt, FaPaperPlane } from 'react-icons/fa'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BsEmojiSmile } from 'react-icons/bs'
import { useEffect, useState } from "react"
import { auth, changeTypingStatus, getChat, getFireUser, getMessages, sendMessage } from "lib/firebase"
import { useApp } from "context/AppContext"
import EmojiPicker from 'emoji-picker-react';



export default function Chat() {
  const { selectedChat, chat, setChat, message, setMessage }: any = useApp()
  const [messages, setMessages] = useState([])
  const [emoji, setEmoji] = useState(false)
  const [chatPerson, setChatPerson] = useState(Object)
  const [chatUid, setChatUid] = useState(String)
  const [meUid, setMeUid] = useState(String)
  var oldTime: any


  useEffect(() => {
    getMessages(setMessages, selectedChat)

    selectedChat.split("-").map((uid: any) => {
      if(uid !== auth.currentUser.uid) {
        getFireUser(setChatPerson, uid)
      }
    })

    setMeUid(auth.currentUser.uid === chat.uid ? "typing_uid" : "typing_uid2")
  }, [auth.currentUser, selectedChat])
  


  useEffect(() => {
    changeTypingStatus(selectedChat, chat, message.length>0, meUid),
    getChat(setChat, selectedChat)
  }, [message])
  
  
  
  useEffect(() => {
    localStorage.setItem(`last_messages`, JSON.stringify([
      {
        uid: chatPerson.uid,
        message
      }
    ]))
  }, [message])


  const setOldTime = (time: any) => {
    oldTime = time

    console.log(oldTime);
    
  }
  
  return (
    <div className="chat">
        {selectedChat !== "" ? (

          <>
            <div className="title">
              <div className="chat-info">
                <Image src={chatPerson.image_url} width={48} height={48} alt="" />
                <div className="chat-more-info">
                  <span>{chatPerson.display_name}</span>
                  {/* <p>
                   {(auth.currentUser.uid !== chat.uid ? chat.typing_uid : chat.typing_uid2) === true ? (
                    "Typing..."
                   ) :
                    chatPerson.online ? "Online" : "Last seen: "
                   }
                  </p> */}
                </div>
              </div>

              <div className="chat-buttons">
                <button type="button" className="circle-btn">
                  <FaPhoneAlt />
                </button>
                <button type="button" className="circle-btn">
                  <BiDotsVerticalRounded />
                </button>


              </div>

            </div>

            <div className="chat-main">
              <div className="messages-section">
                {messages?.length>0 ? messages.map((message: any, index) => {                
                
                                  
                return (
                  <>
                    {message?.uid === auth?.currentUser?.uid ? (
                      <div className="message-me" key={index}>
                        <div className="message">
                          <p className="msg">
                          {message?.message}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="message-person" key={index} onLoad={() => setOldTime(message.created_at)} >
                        {oldTime - message?.timestamp?.seconds > 60 && (
                        <Image src={chatPerson.image_url || ""} width={36} height={36} alt="" className="profile" />
                        )}
                        <div className="message">
                          <div className="message-creator">
                            <span>{chatPerson.display_name}</span>
                            <p>{message?.timestamp?.seconds}</p>
                          </div>
                          <p className="msg">
                          {message?.message}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )
                
                }
                ) : (
                  <span>No message found</span>
                )}
                

              </div>


              {emoji && (
              <div className="close" onClick={() => setEmoji(false)}></div>
              )}
              <form className="send-message" onSubmit={(e) => sendMessage(e, auth.currentUser?.uid, selectedChat, message, setMessage)}>
                <input type="text" placeholder="Write a Message..." value={message} onChange={(e) => setMessage(e.target.value)} />

                <div className="send-more">
                  <div className="pick-emoji">
                    <BsEmojiSmile size={22} onClick={() => setEmoji(!emoji)} />

                    {/* {emoji && (
                        <EmojiPicker theme="dark" onEmojiClick={(e: any) => setMessage(e.emoji)} />
                    )} */}

                  </div>
                  <AiTwotoneAudio size={24} />
                  <AiOutlinePaperClip size={24} />
                  <hr />
                  <button type="submit">
                    <FaPaperPlane size={20} className="send-message-btn" />
                  </button>
                </div>
              </form>
            </div>
          </>

        ) : (

          <div className="no-chat">

            <span>Start talking</span>
          </div>

        )}
        

      </div>
  )
}
