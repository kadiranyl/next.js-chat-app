import Chat from "components/Chat"
import Layout from "components/Layout"
import Messages from "components/Messages"

export default function Home() {
  return (
    <Layout>
      <Messages />
      <Chat />
    </Layout>
  )
}
