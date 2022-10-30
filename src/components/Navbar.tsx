import Image from "next/image";
import { IoMdNotifications } from 'react-icons/io'
import { BiChevronDown } from 'react-icons/bi'
import Link from "next/link";
import { signOutHandler } from "lib/auth";
import { useApp } from "context/AppContext";
import Search from "./Search";
import { auth } from "lib/firebase";

export default function Navbar() {
  const { fireUser } = useApp()
  

  return (
    <nav>
      <div className="nav-item">
        <Link href="/" className="logo">
          <Image src="/logo.svg" width={56} height={56} alt="" />
        </Link>
  
        <Search />      
      </div>

      <div className="nav-item">
        <div className="notification has">
          <IoMdNotifications size={24} />
        </div>

        <div className="profile-dropdown" onClick={signOutHandler}>
          <Image src={auth.currentUser?.photoURL} width={36} height={36} alt="" />
          <span>{auth.currentUser?.displayName}</span>
          <BiChevronDown size={24} />
        </div>
      </div>

    </nav>
  )
}
