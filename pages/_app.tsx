import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import Layout from '../layouts'
import '../styles/index.css'
import fetcher from '../utils/fetcher'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        revalidateOnFocus: false,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

export default CustomApp
