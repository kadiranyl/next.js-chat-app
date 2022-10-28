import Link from 'next/link'
import { RiMessage3Fill, RiSettings3Fill, RiCalendarFill, RiGroupFill, RiImageAddFill } from 'react-icons/ri'

export default function Sidebar() {
  return (
    <aside>
      <Link href="/" className='active'>
        <RiMessage3Fill size={32} />
      </Link>
      <Link href="/">
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
