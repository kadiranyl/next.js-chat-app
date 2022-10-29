import { createUser } from 'lib/auth'
import React, { useState } from 'react'

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <div className='auth-page'>
        <form onSubmit={(e: any) => createUser(e, email, password)}>
            <input type="text" name="email" placeholder='E-mail' required value={email} onChange={(e: any) => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder='Password' required value={password} onChange={(e: any) => setPassword(e.target.value)} />
            <button type='submit' disabled={!email || !password}>Sign up</button>
        </form>
    </div>
  )
}
