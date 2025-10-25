"use client"
import { ChevronUp, User2 } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { logoutAction } from "@/actions/formActions";
import { useUserContext } from "./context/UserContext";
export default function SidebarDialogFooter() {
    const { user } = useUserContext();
    return (
        <SidebarFooter>
        <Dialog>
        <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {user?.username}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DialogTrigger asChild>
                  <DropdownMenuItem className="w-full">
                    <span className="block w-[250px] text-center bg-gray-400 hover:bg-gray-700 hover:text-white p-3 cursor-pointer">Sign out</span>
                  </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign out</DialogTitle>
                  <DialogDescription>Are you sure?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                  <Button variant="secondary" className="bg-gray-300 px-4 py-2 rounded-md mr-2 cursor-pointer">Cancel</Button>
                  </DialogClose>
                  <form action={logoutAction}>
                  <button  type="submit"  className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer">Sign out</button>
                  </form>
                </DialogFooter>
              </DialogContent>
            </SidebarMenuItem>
          </SidebarMenu>
          </Dialog>
      </SidebarFooter>
    )
}