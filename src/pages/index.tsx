import Chat from "components/Messages"
import Layout from "components/Layout"
import Messages from "components/Chats"

export default function Home() {
  
  return (
    <Layout>
      <Messages />
      <Chat />
    </Layout>
  )
}
