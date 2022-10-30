import { useApp } from 'context/AppContext'
import { getFireUsers } from 'lib/firebase'
import { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'

export default function Search() {
  const { setSearchResult, search, setSearch, focusSearch } = useApp()

  useEffect(() => {
    getFireUsers(setSearchResult, search)
  }, [search])
  
  
  return (
    <div className="search-input">
        <BiSearch size={20} />
        <input type="text" placeholder="Find person, group name..." value={search} onChange={(e: any) => setSearch(e.target.value)} autoFocus={focusSearch ? focusSearch : undefined} />
    </div>
  )
}
