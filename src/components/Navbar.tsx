import Image from "next/image";
import { IoMdNotifications } from 'react-icons/io'
import { BiChevronDown, BiSearch } from 'react-icons/bi'
import Link from "next/link";
import { signOutHandler } from "lib/auth";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-item">
        <Link href="/" className="logo">
          <Image src="/logo.svg" width={56} height={56} alt="" />
        </Link>

        <div className="search-input">
          <BiSearch size={20} />
          <input type="text" placeholder="Find person, group name..." />
        </div>
      </div>

      <div className="nav-item">
        <div className="notification has">
          <IoMdNotifications size={24} />
        </div>

        <div className="profile-dropdown" onClick={signOutHandler}>
          <Image src="/user.jpeg" width={36} height={36} alt="" />
          <span>Kadirhan Yılmaz</span>
          <BiChevronDown size={24} />
        </div>
      </div>

    </nav>
  )
}
