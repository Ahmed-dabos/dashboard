"use client"
import { useUserContext } from "@/components/context/UserContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { editUser } from "@/actions/formActions"
import  { useState } from "react"
export default function EditUser() {
    const [open, setOpen] = useState(false)
    const {user } = useUserContext()
    const router = useRouter()
    const editUserWithId = editUser.bind(null, user?.id)
    return (
        <form action={editUserWithId} className="p-5 flex flex-col gap-1.5 ">
            <Label htmlFor="username">username:</Label>
            <Input id="username" type="text" name="username" defaultValue={user?.username}/>
            <Label htmlFor="email">email:</Label>
            <Input id="email" type="email" name="email" defaultValue={user?.email}/>
            <Label htmlFor="password">password</Label>
            <div className="flex">
            <Input id="password" type={open? "text" : "password"} name="password" defaultValue={user?.password}/>
            <span onClick={() => setOpen(prev => !prev)} className="underline text-sm cursor-pointer">show password</span>
            </div>
            <Input id="password" type="password" name="userId" defaultValue={user?.userId} hidden/>
            <Button type="button" onClick={() => router.push("/profile")}>cancel</Button>
            <Button type="submit">save</Button>
        </form>
    )
}