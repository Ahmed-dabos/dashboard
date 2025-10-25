"use client"
import { useUserContext } from "@/components/context/UserContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"
import Link from "next/link"
export default function ProfilePage() {
    const { user } = useUserContext()
    return (
        <main className="p-[50px]">
            <Card className="h-[80vh] flex justify-center">
                <CardHeader>
                    <CardTitle className="flex">user details <Link href={`/profile/edit`}><Pencil /></Link></CardTitle>
                </CardHeader>
                <CardContent>
                    <div>username: {user?.username}</div>
                    <div>email: {user?.email}</div>
                    <div>password: <Input type="password" defaultValue={user?.password} disabled/></div>
                </CardContent>
            </Card>
        </main>
    )
}