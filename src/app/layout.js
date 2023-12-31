import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from "./providers"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Labex BIS Simulator',
  description: 'BIS Simulator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
