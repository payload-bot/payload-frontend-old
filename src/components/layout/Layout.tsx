import Head from 'next/head'
import React, { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

type LayoutProps = {
  children?: ReactNode
  title?: string
  sideBar?: boolean
}

export default function Layout({
  children,
  title = 'Payload | The TF2 Discord Bot',
  sideBar,
}: LayoutProps) {
  return (
    <>
      <Header sideBar={sideBar} />
      <Head>
        <title>{title}</title>
      </Head>
      {children}
      <Footer />
    </>
  )
}
