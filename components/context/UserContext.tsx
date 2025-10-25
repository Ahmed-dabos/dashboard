"use client"
import { createContext, useContext, useState, useEffect } from "react"

type User = {
    userId: string;
    username: string;
    email: string;
    password: string;
    id: string;
} | null

type UserContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User>(null)
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(prev => {
                if (prev !== parsedUser) {
                    return parsedUser
                }
                return prev
            })
            
        }}, [])
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context
}