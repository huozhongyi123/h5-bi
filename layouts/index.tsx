import React from 'react'
import Head from 'next/head'

type Props = {
  title?: string
}

const DefaultLayout: React.FC<Props> = ({ children, title = 'BI Console' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <style jsx>{`
        main {
          margin: 0 auto;
          max-width: 414px;
          min-height: 100vh;
          background: #f1f3f5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
  )
}

export default DefaultLayout
