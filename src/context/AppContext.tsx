import { onAuthStateChanged } from "firebase/auth"
import { signOutHandler } from "lib/auth"
import { auth, getFireUser } from "lib/firebase"
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"

const AppContext = createContext({})

export const useApp = () => useContext(AppContext)

export function AppContextProvider({children}: any) {
  const router = useRouter()
  const [fireUser, setFireUser] = useState(null)
  const [searchChats, setSearchChats] = useState(Object)
  const [login, setLogin] = useState(Boolean)
  const [loading, setLoading] = useState(true)

  const [searchResult, setSearchResult] = useState(Array)
  const [search, setSearch] = useState(String)
  const [selectedChat, setSelectedChat] = useState(String)
  const [chat, setChat] = useState(Object)
  const [focusSearch, setFocusSearch] = useState(false)
  const [message, setMessage] = useState(String)

  
  useEffect(() => {
    if (localStorage.getItem("last_message")) {
      setMessage(localStorage.getItem("last_message") || '')
    }
  }, [])


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getFireUser(setFireUser, user.uid)
        setLogin(true)
        setLoading(false)
        if (router.pathname === "/login" || router.pathname === "/register") {
          router.push("/")
        }
      } else {
        setLogin(false)
        setLoading(false)
        if (router.pathname !== "/register") {
          router.push("/login")
        }
        signOutHandler()
      }
    });
  }, [auth])



  if (!loading) {
    return (
      <AppContext.Provider value={{login, searchResult, fireUser, setSearchResult, setSearchChats, search, setSearch, selectedChat, setSelectedChat, chat, setChat, focusSearch, setFocusSearch, message, setMessage}}>
        {children}
      </AppContext.Provider>
    )
  }
  return (
    <>
    </>
  )
}