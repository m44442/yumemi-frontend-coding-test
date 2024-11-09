import '../styles/globals.css'  
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '都道府県別総人口推移グラフ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
