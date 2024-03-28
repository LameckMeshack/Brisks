// import { CategoryScale } from "chart.js";
// import Chart from "chart.js/auto";
import SalesChart from "../components/MonthlyChart";
interface DataItem {
  YEAR_ID: string;
  SALES: number;
}

// Chart.register(CategoryScale);

export default async function Months() {
  return (
    <main className="flex">
      <div className="flex flex-col p-4 gap-4 w-11/12 bg-gray-200 ">
        <div className="flex-1 grid gap-4 grid-cols-1 md:grid-cols-2 ">
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4">
            <h1 className="text-4xl text-black font-bold">
              Pie Sales and Year
            </h1>
            <SalesChart />
          </div>
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4">
            <h1 className="text-4xl text-black font-bold">Sales Metrices</h1>
            {/* <SalesMatrix data={data2} /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
