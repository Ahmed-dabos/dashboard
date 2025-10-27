"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { addCustomer } from "@/actions/formActions";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { useUserContext } from "./context/UserContext";
export default  function AddCustomer() { 
    const {user} = useUserContext();
    return (
         <Dialog>
                    <DialogTrigger asChild>
                        <Button className="felx items-center gap-2">Add customer <UserPlus size={4} /></Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Add new customer</DialogTitle>
                        </DialogHeader>
                        <form action={addCustomer} className="flex flex-col gap-2">
                            <Label htmlFor="name">name:</Label>
                            <Input id="name" type="text" name="name"/>
                            <Label htmlFor="email">email:</Label>
                            <Input id="email" type="email" name="email" />
                            <Label htmlFor="payments">payments:</Label>
                            <Input id="payments" type="text" name="payments" />
                            <Input id="payments" type="text" name="userId" defaultValue={user?.userId} hidden />
                            <DialogClose asChild>
                            <Button type="submit">add</Button>
                            </DialogClose>
                        </form>
                    </DialogContent>
                </Dialog>
    )
}