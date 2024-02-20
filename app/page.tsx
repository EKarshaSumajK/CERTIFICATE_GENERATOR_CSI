import { Navbar } from '@/components'
import Image from 'next/image'
import backgroundImage from "./backgroundImage.png"
import { Poppins } from 'next/font/google'

// Subsets are really important. CHECK BELOW FOR MORE INFO
const poppins = Poppins({
  subsets: ['latin'],
  weight: '700'
})
import "./globals.css"
export default function Home() {
  return (
    <main className={poppins.className}  >
      <Navbar />
     
    </main>
  )
}
