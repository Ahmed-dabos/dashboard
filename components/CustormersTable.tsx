import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Customers } from "@/lib/schema"
import { Button } from "./ui/button"
import { Pencil} from "lucide-react"
import DeleteCustomerButton from "./Delete-Customer-Button"
import { editCustomer, getCustomers, handleDelete } from "@/actions/formActions"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default async function CustomersTable() {
   const data =  await getCustomers()
    return (
        <Table>
          <TableCaption>Customers Table</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">name</TableHead>
              <TableHead>email</TableHead>
              <TableHead>payments</TableHead>
              {data !== "Not found" &&<TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data !== "Not found"  ? data.map((customer:Customers) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.payments}$</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost"><Pencil size={4} /></Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>edit customer</DialogTitle>
                      </DialogHeader>
                      <form action={editCustomer} className="flex flex-col gap-2">
                        <Label htmlFor="name">name:</Label>
                        <Input id="name" type="text" name="name" defaultValue={customer.name}/>
                        <Label htmlFor="email">email:</Label>
                        <Input id="email" type="email" name="email" defaultValue={customer.email}/>
                        <Label htmlFor="payments">payments:</Label>
                        <Input id="payments" type="text" name="payments" defaultValue={customer.payments} />
                        <Input type="text" name="id" defaultValue={customer.id} hidden />
                        <DialogClose asChild>
                          <Button variant="secondary" type="button">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button type="submit">edit</Button>
                        </DialogClose>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <DeleteCustomerButton id={customer.id} handleDelete={handleDelete} />
                </TableCell>
              </TableRow>
                )): <TableRow>
                      <TableCell colSpan={4} className="text-center">No customers found.</TableCell>
                    </TableRow>}
          </TableBody>
        </Table>
    )
}