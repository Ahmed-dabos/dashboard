"use server"
import { v4 } from "uuid"
import { userSchema } from "@/lib/schema"
import { loginSchema } from "@/lib/schema"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
export async function signupAction(formData: FormData) {
    const userData = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    }
    const parsedData = userSchema.safeParse(userData)
    if (!parsedData.success) {
        return {error: "Invalid user data" }
    } else {
        const {username, email, password} = parsedData.data  
        try{
        const res = await fetch("https://689c588f58a27b18087dcde8.mockapi.io/api/v1/users")
        const users = await res.json()
        const userExists = users.find((user: { email: string }) => user.email === email)
        if (userExists) {
            return {error: "User with this email already exists"}
        } else {
            const newUser = {
                userId: v4(),
                username,
                email,
                password
            }
            await fetch("https://689c588f58a27b18087dcde8.mockapi.io/api/v1/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            })
        return {success: true}
    }
}  catch (error) {
           console.log(error)
        }
} 
}

export async function loginAction(formData: FormData) {
  const user = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }
    const parsedData = loginSchema.safeParse(user)
    if (!parsedData.success) {
        return {error: "Invalid login data" }
    } else {
        const { email, password } = parsedData.data  
        try{
        const res = await fetch("https://689c588f58a27b18087dcde8.mockapi.io/api/v1/users")
        const users = await res.json()
        const existingUser = users.find((user: { email: string; password: string }) => user.email === email && user.password === password)
        if (!existingUser) {
            return {error: "Invalid email or password"}
        } else {
            const cookie = await cookies()
            cookie.set("sessionToken", existingUser.userId, { httpOnly: true, secure:true, path: "/", maxAge: 60 * 60 * 24 })
            return {success: true , existingUser}
        }
    }  catch (error) {
        console.log(error)
}
    }
}
export async function logoutAction() {
    const cookie = await cookies()
    cookie.delete("sessionToken")
    redirect("/login")
}

export async function editUser(id: string | undefined, formData:FormData) {
    const editedUser = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        userId: formData.get("userId")
    }
    const res = await fetch(`https://689c588f58a27b18087dcde8.mockapi.io/api/v1/users/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(editedUser)
    })
    const cookie = await cookies()
    cookie.delete("sessionToken")
    redirect("/login")
}
export async function getCustomers() {
    const res = await fetch(`https://68ff53b1e02b16d1753d7321.mockapi.io/api/v1/customers?userId=${(await cookies()).get("sessionToken")?.value}`)
    const data = await res.json()
    return data
}
export async function handleDelete(id: string) { 
        await fetch(`https://68ff53b1e02b16d1753d7321.mockapi.io/api/v1/customers/${id}`, {
            method: 'DELETE',
        })
        revalidatePath('/customers')
    }
export async function addCustomer(formData: FormData) {
    const newCustomer = {
        name: formData.get("name"),
        email: formData.get("email"),
        payments: formData.get("payments"),
        userId: formData.get("userId")
    }
    if(newCustomer.name){
        try {
        const res = await fetch("https://68ff53b1e02b16d1753d7321.mockapi.io/api/v1/customers", {
            method: "Post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newCustomer)
        }
        )
        revalidatePath('/customers')
    }catch (error) {
        console.log(error)
    }
} 
}
export async function editCustomer(formData: FormData) {
    const id = formData.get("id")
    const editedCustomer = {
        name: formData.get("name"),
        email: formData.get("email"),
        payments: formData.get("payments")
    }
    if(editedCustomer.name) {
        try {
            const res = await fetch(`https://68ff53b1e02b16d1753d7321.mockapi.io/api/v1/customers/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify(editedCustomer)
            })
            revalidatePath('/customers')
        } catch (error) {
            console.log(error)
        }
    }
}