import { createContext, useContext, useEffect, useState } from "react"

const AppContext = createContext({})

export const useApp = () => useContext(AppContext)

export default function AppWrapper({children}: any) {


  return (
    <AppContext.Provider value="">
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}