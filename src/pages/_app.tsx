import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { AppContextProvider } from 'context/AppContext'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'


export default function App({ Component, pageProps }: AppProps) {
  dayjs.extend(relativeTime)

  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}
