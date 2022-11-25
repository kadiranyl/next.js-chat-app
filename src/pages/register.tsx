import AuthLayout from 'components/AuthLayout'
import { useApp } from 'context/AppContext'
import { createUser } from 'lib/firebase/auth'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Register() {
  const { router }: any = useApp()
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <AuthLayout>
        <form onSubmit={(e: any) => createUser(e, displayName, email, password, router)}>
            <input type="text" name="name" placeholder='Display Name' required value={displayName} onChange={(e: any) => setDisplayName(e.target.value)} />
            <input type="text" name="email" placeholder='E-mail' required value={email} onChange={(e: any) => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder='Password' required value={password} onChange={(e: any) => setPassword(e.target.value)} />
            <button type='submit' disabled={!email || !password}>Sign up</button>
            <div className="not-yet">
              <span>Have an account?</span>
              <Link href="/login">
                Sign In
              </Link>
            </div>
        </form>
    </AuthLayout>
  )
}
