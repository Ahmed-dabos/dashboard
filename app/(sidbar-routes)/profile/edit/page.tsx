"use client"
import { useUserContext } from "@/components/context/UserContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { editUser } from "@/actions/formActions"
export default function EditUser() {
    const {user } = useUserContext()
    const router = useRouter()
    const editUserWithId = editUser.bind(null, user?.id)
    return (
        <form action={editUserWithId} className="p-5 flex gap-1.5">
            <Label htmlFor="username">username:</Label>
            <Input id="username" type="text" name="username" defaultValue={user?.username}/>
            <Label htmlFor="email">email:</Label>
            <Input id="email" type="email" name="email" defaultValue={user?.email}/>
            <Label htmlFor="password">password</Label>
            <Input id="password" type="password" name="password" defaultValue={user?.password}/>
            <Input id="password" type="password" name="userId" defaultValue={user?.userId} hidden/>
            <Button type="button" onClick={() => router.push("/profile")}>cancel</Button>
            <Button type="submit">save</Button>
        </form>
    )
}