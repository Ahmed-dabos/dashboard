"use client"
import { useUserContext } from "@/components/context/UserContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Pencil } from "lucide-react"
import {useState} from "react"
import Link from "next/link"
export default function ProfilePage() {
    const { user } = useUserContext()
    const [show, setShow] = useState(false)
    return (
        <main className="p-[50px]">
            <Card className="h-[80vh] flex">
                <CardHeader>
                    <CardTitle>user details:  </CardTitle>
                    <CardDescription><Link href={`/profile/edit`} className="underline flex items-center">Edit <Pencil size={10} /></Link></CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-9">
                    <div>username: <span className="font-bold">{user?.username}</span></div>
                    <Separator />
                    <div>email: <span className="font-bold">{user?.email}</span></div>
                    <Separator />
                    <div className="flex gap-2 items-center">
                    <div>password: </div>
                    <Input type={show ? "text" : "password"} defaultValue={user?.password} disabled/>
                    <span onClick={() => setShow(prev => !prev)} className="cursor-pointer text-sm underline">{show ? "hide" : "show"} password</span>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}