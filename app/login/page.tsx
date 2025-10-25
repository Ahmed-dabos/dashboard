"use client"
import { useRouter } from "next/navigation"
import { loginAction } from "@/actions/formActions";
import  { LoginSchema, loginSchema} from "@/lib/schema";
import { useForm , Controller} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import {  Loader2 } from "lucide-react";
import {toast} from "sonner"
import { useUserContext } from "@/components/context/UserContext";
import Link from "next/link";
export default function LoginPage() {
    const {setUser} = useUserContext()
    const router = useRouter()
     const form = useForm<LoginSchema>({
        mode: "onBlur",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
     })
    async function onSubmit(data: LoginSchema) {
       const formData = new FormData()
       formData.append("email", data.email)
       formData.append("password", data.password)
       const result= await loginAction(formData)
         if (result?.error) {
            toast.error(result.error)
            form.reset()
          } else {
            toast.success("Login was successful")
            localStorage.setItem("user", JSON.stringify(result?.existingUser))
            setUser(result?.existingUser)
            router.push("/")
    }
}
    return ( 
        <main className="flex justify-center items-center h-screen">
            <Card className="w-full sm:max-w-md ">
                <CardHeader>
                    <CardTitle className="text-center text-[40px] font-bold">Login</CardTitle>
                    <CardDescription className="text-center text-[16px]">
                        Log in to explore our world!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="signup">
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({field, fieldState}) =>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="email">email:</FieldLabel>
                                            <Input {...field} id="email" aria-invalid={fieldState.invalid} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                )} />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({field, fieldState}) =>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="password">password:</FieldLabel>
                                            <Input {...field} id="password" aria-invalid={fieldState.invalid} type="password" />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                )} />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center flex-col gap-4">
                        <div> Are you new?<Link href="/login" className="mr-4 text-sm underline">Sign up</Link></div>
                        <Button size="lg" type="submit" form="signup" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin"/>:"Login"}
                        </Button>
                </CardFooter>
            </Card>
        </main>
    )
}