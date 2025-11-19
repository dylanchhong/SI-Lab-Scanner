import Image from "next/image";
import Logo from '@/public/SI-2025-logo.png'
import './globals.css'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-center items-center mt-10">
          <Image
            src={Logo}
            alt="CASAS SI 2025 Logo"
          />
        </div>
        <main>{children}</main>
      </body>
    </html>
  )
}