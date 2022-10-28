import Image from "next/image"
import Link from "next/link"
import { IoMdAdd } from 'react-icons/io'

export default function Messages() {
  return (
    <div className="messages">
        <div className="title">
          <h1>Messages</h1>
          <button type="button" className="circle-btn">
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

      </div>
  )
}
