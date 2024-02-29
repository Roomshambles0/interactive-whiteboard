
import AuthContext from '@/utils/contexts/AuthContext'
import './globals.css'
import { ToastProvider } from '@/utils/contexts/ToastContext'
import { getCurrentUser } from './actions/getcurrentUser'
import { redirect } from 'next/navigation'




export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
// const user = await getCurrentUser()
// if(user){
//   redirect("/dashboard")
// }
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ToastProvider />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
