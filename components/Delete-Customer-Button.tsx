"use client"
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export default function DeleteCustomerButton({ handleDelete , id}: { handleDelete: (id: string) => Promise<void> , id: string}) {
    return <Button variant="ghost" onClick={() => handleDelete(id)}><Trash2 size={4} /></Button>
}