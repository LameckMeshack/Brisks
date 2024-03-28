import BarGraph from "../components/BarGraph";
import SalesMatrix from "../components/SalesMatrix";
import SalesPieChart from "../components/SalesPieChart";
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

async function getData2(): Promise<DataItem[]> {
  const res = await fetch("http://localhost:5000/sales-metrics");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  const data2 = await getData2();

  return (
    <main className="flex">
      <div className="flex flex-col p-4 gap-4 w-11/12 bg-gray-200 ">
        <div className="flex-1 grid gap-4 grid-cols-1 md:grid-cols-2 ">
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4">
            <h1 className="text-4xl text-black font-bold">
              Pie Sales and Year
            </h1>
            <SalesPieChart data={data} />
          </div>
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4">
            <h1 className="text-4xl text-black font-bold">Sales Metrices</h1>
            <SalesMatrix data={data2} />
          </div>
        </div>
      </div>
    </main>
  );
}
