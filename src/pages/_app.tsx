import '../styles/main.scss'
import '../styles/responsive.scss'
import type { AppProps } from 'next/app'
import { AppContextProvider } from 'context/AppContext'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import NextNProgress from 'nextjs-progressbar';


export default function App({ Component, pageProps }: AppProps) {
  dayjs.extend(relativeTime)

  return (
    <AppContextProvider>
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      <Component {...pageProps} />
    </AppContextProvider>
  )
}
