import ChartAreaGradient from "@/components/DashboardChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Todos from "@/components/todos"
import { ScrollArea } from "@/components/ui/scroll-area"
import CalendarComponent from "@/components/Calendar"
export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-8 gap-5 w-fullmd:grid-row-2 lg:grid-rows-2 h-screen">
        <ScrollArea>
        <Card className="h-80 overflow-auto">
          <CardHeader>
            <CardTitle>user todos</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
              <Todos />
          </CardContent>
        </Card>
        </ScrollArea>
      <div><CalendarComponent /></div>
      <div className="col-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1"><ChartAreaGradient /></div>
    </main>
  )
}
