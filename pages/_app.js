// @ts-check
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import '../styles/github.css'
import { Kbar } from '../components/Kbar/Kbar'
import Analytics from '../components/Analytics'
import { useGtag } from 'hooks/useGtag'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

/**
 *
 * @param {import('next/app').AppProps} props
 */
function App({ Component, pageProps }) {
  useGtag()

  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <Kbar>
        <Component {...pageProps} />
      </Kbar>
    </QueryClientProvider>
  )
}

export default App
