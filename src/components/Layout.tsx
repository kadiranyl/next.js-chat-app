import { useApp } from "context/AppContext";
import { auth } from "lib/firebase";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({children, ...customMeta}: any) {
  const { fireUser }: any = useApp()
  const router = useRouter()
  
  const meta = {
    description: ``,
    defaultTitle: 'Zuppa | Real-time Chatting',
    image: "/avatar.png",
    type: "website",
    path: process.env.NEXT_PUBLIC_SITE_URL + router.asPath,
    ...customMeta,
  };
  


  if (fireUser && auth.currentUser) {
    return (
      <>
          <Head>
              <title>{meta.title ? meta.title + " | " + meta.defaultTitle : meta.defaultTitle}</title>
              <meta name="robots" content="follow, index" />
              <meta content={meta.description} name="description" />
              <meta
              property="og:url"
              content={meta.path}
              />
              <link
              rel="canonical"
              href={meta.path}
              />
              <meta property="og:type" content={meta.type} />
              <meta property="og:site_name" content={meta.defaultTitle} />
              <meta property="og:description" content={meta.description} />
              <meta property="og:title" content={meta.title} />
              <meta property="og:image" content={meta.image} />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@mannupaaji" />
              <meta name="twitter:title" content={meta.title} />
              <meta name="twitter:description" content={meta.description} />
              <meta name="twitter:image" content={meta.image} />
              {meta.date && (
              <meta property="article:published_time" content={meta.date} />
              )}
          </Head>
  
          <div className="full-page">
            <Navbar />
  
            <div className="full-main">
                <Sidebar />
                <main>
                  {children}
                </main>
            </div>
          </div>
              
      </>
    )
  }
  return (
    <>
    </>
  )
}
