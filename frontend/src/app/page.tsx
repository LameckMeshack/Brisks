import BarGraph from "./components/BarGraph";
import SalesPieChart from "./components/SalesPieChart";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
interface DataItem {
  YEAR_ID: string;
  SALES: number;
}

Chart.register(CategoryScale);

async function getData(): Promise<DataItem[]> {
  const res = await fetch("http://localhost:5000/read-csv");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen   items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-black font-bold">Pie Sales and Year</h1>
        <SalesPieChart data={data} />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-black font-bold">Bar Sales and Year</h1>
        <BarGraph data={data} />
      </div>
    </main>
  );
}
