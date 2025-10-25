import ChartAreaGradient from "@/components/DashboardChart"

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-5 w-full">
      <div className="col-span-3"><ChartAreaGradient /></div>
      <div className="col-span-2">1</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </main>
  )
}
