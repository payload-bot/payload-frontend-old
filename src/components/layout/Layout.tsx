import Head from 'next/head'
import React, { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

type LayoutProps = {
  children?: ReactNode
  title?: string
}

export default function Layout({
  children,
  title = 'Payload | The TF2 Discord Bot',
}: LayoutProps) {
  return (
    <>
      <Header />
      <Head>
        <title>{title}</title>
      </Head>
      {children}
      <Footer />
    </>
  )
}
