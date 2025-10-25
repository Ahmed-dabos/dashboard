"use client"
import { useRouter } from "next/navigation"
import { signupAction } from "@/actions/formActions";
import  { userSchema } from "@/lib/schema";
import type { UserSchema } from "@/lib/schema";
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
import Link from "next/link";
export default function SignupPage() {
    const router = useRouter()
     const form = useForm<UserSchema>({
        mode: "onBlur",
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
     })
    async function onSubmit(data: UserSchema) {
       const formData = new FormData()
       formData.append("username", data.username)
       formData.append("email", data.email)
       formData.append("password", data.password)
       formData.append("confirmPassword", data.confirmPassword)
       const result= await signupAction(formData)
         if (result?.error) {
            toast.error(result.error)
            form.reset()
          } else {
            toast.success("Account created successfully!")
            router.push("/login")
    }
}
    return ( 
        <main className="flex justify-center items-center h-screen">
            <Card className="w-full sm:max-w-md ">
                <CardHeader>
                    <CardTitle className="text-center text-[40px] font-bold">sign up</CardTitle>
                    <CardDescription className="text-center text-[16px]">
                        Create an account to get started!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="signup">
                        <FieldGroup>
                            <Controller
                                name="username"
                                control={form.control}
                                render={({field, fieldState}) =>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="username">Username:</FieldLabel>
                                            <Input {...field} id="username" aria-invalid={fieldState.invalid} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                )} />
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
                            <Controller
                                name="confirmPassword"
                                control={form.control}
                                render={({field, fieldState}) =>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="confirmPassword">confirm password:</FieldLabel>
                                            <Input {...field} id="confirmPassword" aria-invalid={fieldState.invalid} type="password" />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                )} />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center flex-col gap-4">
                        <div>Already have an account?<Link href="/login" className="mr-4 text-sm underline">Log in</Link></div>
                        <Button size="lg" type="submit" form="signup" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin"/>:"Sign up"}
                        </Button>
                </CardFooter>
            </Card>
        </main>
    )
}