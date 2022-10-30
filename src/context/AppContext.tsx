import { onAuthStateChanged } from "firebase/auth"
import { getFireUser, signOutHandler } from "lib/auth"
import { auth } from "lib/firebase"
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"

const AppContext = createContext({})

export const useApp = () => useContext(AppContext)

export function AppContextProvider({children}: any) {
  const router = useRouter()
  const [fireUser, setFireUser] = useState(null)
  const [searchChats, setSearchChats] = useState(Object)
  const [login, setLogin] = useState(null)

  const [searchResult, setSearchResult] = useState(Array)
  const [search, setSearch] = useState(String)
  const [selectedChat, setSelectedChat] = useState(String)
  const [chat, setChat] = useState({})
  const [focusSearch, setFocusSearch] = useState(false)



  useEffect(() => {
    getFireUser(setFireUser)
  }, [auth.currentUser])


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true)
        if (router.pathname === "/login" || router.pathname === "/register") {
          router.push("/")
        }
      } else {
        setLogin(false)
        if (router.pathname !== "/register") {
          router.push("/login")
        }
        signOutHandler()
      }
    });
  }, [auth])



  if (login !== null) {
    return (
      <AppContext.Provider value={{login, searchResult, setSearchResult, setSearchChats, search, setSearch, selectedChat, setSelectedChat, chat, setChat, focusSearch, setFocusSearch}}>
        {children}
      </AppContext.Provider>
    )
  }
}