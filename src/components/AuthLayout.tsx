import { auth } from "lib/firebase/firebase";

export default function AuthLayout({children}: any) {
  if (!auth.currentUser) {
    return (
      <div className='auth-page'>
        {children}
    </div>
    )
  }
  return (
    <>
    </>
  )
}
