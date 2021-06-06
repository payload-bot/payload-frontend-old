import Head from 'next/head'
import React, { ReactNode } from 'react'

type LayoutProps = {
  children?: ReactNode
  title?: string
}

export default function Layout({
  children,
  title = 'Payload | The TF2 Discord Bot',
}: LayoutProps) {
  return (
    <div className="night">
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  )
}
