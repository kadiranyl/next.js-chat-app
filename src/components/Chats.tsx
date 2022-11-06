import { useApp } from "context/AppContext"
import dayjs from "dayjs"
import { auth, getUserChats, openChat } from "lib/firebase"
import Image from "next/image"
import { useEffect, useState } from "react"
import { IoMdAdd } from 'react-icons/io'


export default function Messages() {
  const { setSearch, searchResult, search, setSelectedChat, setMessage, setFocusSearch, router }: any = useApp()

  const [fireUsersChat, setFireUsersChat] = useState([{ display_name: '', image_url: '', biography: '', uid: '', online: false }])
  const [chats, setChats] = useState(Array)
  const [hasFavorites, setHasFavorites] = useState(false)

  

  useEffect(() => {

    
    getUserChats(setChats, setFireUsersChat, setHasFavorites, fireUsersChat, chats, auth.currentUser.uid)
    
    
  }, [])

  useEffect(() => {
    if(localStorage.getItem("last_opened_chat") && chats.length>0) {
      openChat(setSearch, auth.currentUser?.uid, localStorage.getItem("last_opened_chat"), setSelectedChat, router)
    }
  }, [chats])



  const openChatHandler = (chat: any) => {
    openChat(setSearch, auth.currentUser?.uid, chat.uid, setSelectedChat, router)

    setMessage("")
  }


  const findFireUsersChat = (uidd: String) => {
    return fireUsersChat.find((a: any) => a.uid === uidd) || { display_name: '', image_url: '', biography: '', uid: '', online: false }
    
  }
  

  return (
    <div className="messages">
      {search ? (
        <>
        <div className="title">
          <h1>Search</h1>
          <button type="button" className="circle-btn" onClick={() => setFocusSearch(true)}>
            <IoMdAdd />
          </button>
        </div>

        <div className="message-type">
          <h3>{search} Results</h3>
          
          {searchResult.length>0 ? (
            searchResult.map((infos: any, index: any) => (
              <div className="message-item" key={index} onClick={() => openChat(setSearch, auth.currentUser?.uid, infos.uid, setSelectedChat, router) }>
                <div className="content">
                  <div className="avatar">
                    <Image src={infos?.image_url} width={36} height={36} alt="" />
                    <div className={`status ${infos?.online ? "online" : "offline"}`}></div>
                  </div>
                  <div className="content-title">
                    <span>{infos?.display_name}</span>
                    <p>{infos?.biography}</p>
                  </div>
                </div>

                <div className="more">
                  <span className="message-time">5:03</span>
                  <span className="message-count">2</span>
                </div>
              </div>
            ))
          ) : (
            <span>No result</span>
          )}



        </div>
        </>
      ) : chats.length>0 && fireUsersChat.length>0 && (
        <>
          <div className="title">
            <h1>Messages</h1>
            <button type="button" className="circle-btn" onClick={() => setFocusSearch(true)}>
              <IoMdAdd />
            </button>
          </div>

          {hasFavorites && (
            <div className="message-type">
              <h3>Favorites</h3>
              
              {chats && chats.map((chat: any, index) => {
                if (chat.favorite === true) {
                  return (
                    <div key={index} className="message-item" onClick={() => openChat(setSearch, auth.currentUser?.uid, chat.uid, setSelectedChat, router) }>
                      <div className="content">
                        <Image src={findFireUsersChat(chat.uid).image_url} width={36} height={36} alt="" />
                        <div className="content-title">
                          <span>
                            {findFireUsersChat(chat.uid).display_name}
                          </span>
                          <p>{chat.last_message === "" ? findFireUsersChat(chat.uid).biography : chat.last_message}</p>
                        </div>
                      </div>

                      <div className="more">
                        {/* <span className="message-time">{dayjs.unix(chat.last_message.seconds).fromNow()}</span> */}
                        <span className="message-count">2</span>
                      </div>
                    </div>
                  )
                }
              })}

            </div>
          )}

          <div className="message-type">
            <h3>All Messages</h3>
            
              
            {chats && chats.map((chat: any, index) => {
              if (!chat.favorite) {
                return (
                  <div key={index} className="message-item" onClick={() => openChatHandler(chat) }>
                    <div className="content">
                      <div className="avatar">
                        <Image src={findFireUsersChat(chat.uid).image_url} width={36} height={36} alt="" />
                        <div className={`status ${findFireUsersChat(chat.uid).online ? "online" : "offline"}`}></div>
                      </div>
                      
                      <div className="content-title">
                        <span>
                          {findFireUsersChat(chat.uid).display_name}
                        </span>
                        <p>{chat.last_message === "" ? findFireUsersChat(chat.uid).biography : chat.last_message}</p>
                      </div>
                    </div>

                    <div className="more">
                      <span className="message-time">{dayjs.unix(chat.timestamp?.seconds).fromNow()}</span>
                      
                      {chat.unread_message !== 0 && (
                        <span className="message-count">{chat.unread_message}</span>
                      )}
                    </div>
                  </div>
                )
              }
            })}

          </div>
        </>
      )}

      </div>
  )
}
