import '../styles/main.scss'
import type { AppProps } from 'next/app'
import AppWrapper from 'context/AppContext'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'lib/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { signOutHandler } from 'lib/auth';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (router.pathname === "/login" || router.pathname === "/register") {
          router.push("/")
        }
      } else {
        if (router.pathname !== "/register") {
          router.push("/login")
        }
        signOutHandler()
      }
    });
  }, [auth])
  

  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}
