import Chat from "components/Chat"
import Layout from "components/Layout"
import Messages from "components/Messages"
import { useApp } from "context/AppContext"

export default function Home() {
  
  return (
    <Layout>
      <Messages />
      <Chat />
    </Layout>
  )
}
