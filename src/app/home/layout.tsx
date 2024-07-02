'use client'

import Header from "@/components/Header/Header";
import { User } from "@/entities/Users";
import { cleanToken, isAuthenticated } from "@/utils/authentication";
import { useEffect, useState } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let [isAllowedToView, setIsAllowedToView] = useState(false)
  let [user , setUser] = useState<User>({} as User)

  useEffect(() => {
    const verifyUser = async () => {
      isAuthenticated().then(res => {
        if (!res) {
          cleanToken()
          return
        }

        setUser(res as User)
        setIsAllowedToView(true)
      })

      return
    }

    verifyUser()
    return
  }, [])

  return (
    <>
      <Header user={user} isAllowedToView={isAllowedToView} />

      <main>
        {children}
      </main>
    </>
  )

}
