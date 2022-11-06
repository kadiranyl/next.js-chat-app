import { useApp } from 'context/AppContext'
import Link from 'next/link'
import { RiMessage3Fill, RiSettings3Fill, RiCalendarFill, RiGroupFill, RiImageAddFill } from 'react-icons/ri'

export default function Sidebar() {
  const { mobileChats, setMobileChats, router }: any = useApp()

  return (
    <aside>
      <Link href="/" className={router.pathname == "/" && router.asPath === "/" ? "active" : undefined}>
        <RiMessage3Fill size={32} />
      </Link>
      <Link href="?chats=active" className={(router.asPath == "/?chats=active" ? "active" : undefined) + " show-laptop"}>
        <RiGroupFill size={32} />
      </Link>
      <Link href="/">
        <RiImageAddFill size={32} />
      </Link>
      <Link href="/">
        <RiCalendarFill size={32} />
      </Link>
      <Link href="/">
        <RiSettings3Fill size={32} />
      </Link>
    </aside>
  )
}
