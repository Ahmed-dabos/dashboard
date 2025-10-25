"use client"
import { useState, useEffect } from "react";
import { useUserContext } from "./context/UserContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Trash } from "lucide-react";
type Tasks = {
    title: string
    completed: boolean
    id: string
    userId: string
}
export default function Todos() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const { user } = useUserContext()
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`https://689c588f58a27b18087dcde8.mockapi.io/api/v1/users/${user?.id}/tasks`);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        const data = await response.json();
        if (data.length !== 0) {
          setTasks(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [user?.id]);

   function handleForm(formData: FormData) {
    const taskData = formData.get("add-task");
    if (taskData) {
      async function getData() {
        const response = await fetch(
          `https://689c588f58a27b18087dcde8.mockapi.io/api/v1/users/${user?.id}/tasks`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              title: taskData,
              completed: false,
            }),
          }
        );
        const data = await response.json();
        setTasks(prev =>  [...prev, data])
      }
      getData();
    }
  }
  function onDelete(id: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    fetch(`https://689c588f58a27b18087dcde8.mockapi.io/api/v1/users/${user?.id}/tasks/${id}`, {
      method: "Delete",
    });
  }
  return (
        <>
            <form className="flex gap-1" action={handleForm}>
                <Input type="text" name="add-task"/>
                <Button type="submit">add</Button>
            </form>
                {tasks ? tasks.map(task => 
                    (
                        <div key={task.id} className="flex items-center gap-3 m-2 w-full" >
                            <Checkbox id="task" />
                            <Label htmlFor="task">{task.title}</Label>
                            <Button  variant="destructive" className="w-3 h-[22px]" onClick={() => onDelete(task.id)}><Trash size={10}/></Button>
                        </div>
                    )
                ): <p>you have nothing to do</p>}
                </>
  );
}