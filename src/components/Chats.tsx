import { useApp } from "context/AppContext"
import { auth, getChat, getChats, openChat } from "lib/firebase"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoMdAdd } from 'react-icons/io'

export default function Messages() {
  const { setSearch, searchResult, search, setSelectedChat, selectedChat, chat, setChat, setFocusSearch } = useApp()
  const [chats, setChats] = useState([])


  useEffect(() => {
    getChats(auth.currentUser.uid, setChats)

    getChat(setChat, selectedChat)
  }, [])

  

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
            searchResult.map((infos: any) => (
              <div className="message-item" onClick={() => openChat(setSearch, auth.currentUser?.uid, infos.uid, setSelectedChat) }>
                <div className="content">
                  <div className="avatar">
                    <Image src={infos?.imageUrl} width={36} height={36} alt="" />
                    <div className={`status ${infos?.online ? "online" : "offline"}`}></div>
                  </div>
                  <div className="content-title">
                    <span>{infos?.displayName}</span>
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
      ) : (
        <>
          <div className="title">
            <h1>Messages</h1>
            <button type="button" className="circle-btn" onClick={() => setFocusSearch(true)}>
              <IoMdAdd />
            </button>
          </div>

          <div className="message-type">
            <h3>Favorites</h3>
            
            {/* Loop starts */}
            <Link href="/" className="message-item">
              <div className="content">
                <Image src="/user.jpeg" width={36} height={36} alt="" />
                <div className="content-title">
                  <span>Arthur Maliza</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
              </div>

              <div className="more">
                <span className="message-time">5:03</span>
                <span className="message-count">2</span>
              </div>
            </Link>
            {/* Loop ends */}

            <Link href="/" className="message-item">
              <div className="content">
                <Image src="/user.jpeg" width={36} height={36} alt="" />
                <div className="content-title">
                  <span>Arthur Maliza</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
              </div>

              <div className="more">
                <span className="message-time">5:03</span>
                <span className="message-count">2</span>
              </div>
            </Link>

            <Link href="/" className="message-item">
              <div className="content">
                <Image src="/user.jpeg" width={36} height={36} alt="" />
                <div className="content-title">
                  <span>Arthur Maliza</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
              </div>

              <div className="more">
                <span className="message-time">5:03</span>
                <span className="message-count">2</span>
              </div>
            </Link>

          </div>

          <div className="message-type">
            <h3>All Messages</h3>
            
            {/* Loop starts */}
            <Link href="/" className="message-item">
              <div className="content">
                <Image src="/user.jpeg" width={36} height={36} alt="" />
                <div className="content-title">
                  <span>Arthur Maliza</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
              </div>

              <div className="more">
                <span className="message-time">5:03</span>
                <span className="message-count">2</span>
              </div>
            </Link>
            {/* Loop ends */}

            <Link href="/" className="message-item">
              <div className="content">
                <Image src="/user.jpeg" width={36} height={36} alt="" />
                <div className="content-title">
                  <span>Arthur Maliza</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
              </div>

              <div className="more">
                <span className="message-time">5:03</span>
                <span className="message-count">2</span>
              </div>
            </Link>

            <Link href="/" className="message-item">
              <div className="content">
                <Image src="/user.jpeg" width={36} height={36} alt="" />
                <div className="content-title">
                  <span>Arthur Maliza</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
              </div>

              <div className="more">
                <span className="message-time">5:03</span>
                <span className="message-count">2</span>
              </div>
            </Link>

            <Link href="/" className="message-item">
              <div className="content">
                <Image src="/user.jpeg" width={36} height={36} alt="" />
                <div className="content-title">
                  <span>Arthur Maliza</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
              </div>

              <div className="more">
                <span className="message-time">5:03</span>
                <span className="message-count">2</span>
              </div>
            </Link>

            <Link href="/" className="message-item">
              <div className="content">
                <Image src="/user.jpeg" width={36} height={36} alt="" />
                <div className="content-title">
                  <span>Arthur Maliza</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
              </div>

              <div className="more">
                <span className="message-time">5:03</span>
                <span className="message-count">2</span>
              </div>
            </Link>

            <Link href="/" className="message-item">
              <div className="content">
                <Image src="/user.jpeg" width={36} height={36} alt="" />
                <div className="content-title">
                  <span>Arthur Maliza</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
              </div>

              <div className="more">
                <span className="message-time">5:03</span>
                <span className="message-count">2</span>
              </div>
            </Link>

          </div>
        </>
      )}

      </div>
  )
}
