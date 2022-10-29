import Image from "next/image"
import { AiOutlinePaperClip, AiTwotoneAudio } from 'react-icons/ai'
import { FaPhoneAlt, FaPaperPlane } from 'react-icons/fa'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useEffect } from "react"

export default function Chat() {


  return (
    <div className="chat">
        <div className="title">
          <div className="chat-info">
            <Image src="/user.jpeg" width={48} height={48} alt="" />
            <div className="chat-more-info">
              <span>UI Team</span>
              <p>12 member, 2 online</p>
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
            <div className="message-person">
              <Image src="/user.jpeg" width={36} height={36} alt="" className="profile" />
              <div className="message">
                <div className="message-creator">
                  <span>Kadirhan Yılmaz</span>
                  <p>4m</p>
                </div>
                <p className="msg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat molestias aspernatur reprehenderit impedit voluptatem voluptas ullam ad a facilis necessitatibus.
                </p>
                <p className="msg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat molestias aspernatur reprehenderit impedit voluptatem voluptas ullam ad a facilis necessitatibus.
                </p>
              </div>
            </div>

            <div className="message-person">
              <Image src="/user.jpeg" width={36} height={36} alt="" className="profile" />
              <div className="message">
                <div className="message-creator">
                  <span>Kadirhan Yılmaz</span>
                  <p>4m</p>
                </div>
                <p className="msg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat molestias aspernatur reprehenderit impedit voluptatem voluptas ullam ad a facilis necessitatibus.
                </p>
                <p className="msg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat molestias aspernatur reprehenderit impedit voluptatem voluptas ullam ad a facilis necessitatibus.
                </p>
              </div>
            </div>

            

            <div className="message-me">
              <div className="message">
                <p className="msg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat molestias aspernatur reprehenderit impedit voluptatem voluptas ullam ad a facilis necessitatibus.
                </p>
              </div>
            </div>

            <div className="message-me">
              <div className="message">
                <p className="msg">
                Lorem ipsum dolor sit asdasdamet consectetur adipisicing elit. Placeat molestias aspernatur reprehenderit impedit voluptatem voluptas ullam ad a facilis necessitatibus.
                </p>
                <span>4m</span>
              </div>
            </div>
          </div>


          <div className="send-message">
            <input type="text" placeholder="Write a Message..." />

            <div className="send-more">
              <AiTwotoneAudio size={24} />
              <AiOutlinePaperClip size={24} />
              <hr />
              <FaPaperPlane size={20} className="send-message-btn" />
            </div>
          </div>
        </div>

      </div>
  )
}
