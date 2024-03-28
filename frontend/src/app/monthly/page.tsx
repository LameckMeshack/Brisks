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
            <h1 className="text-4xl text-black font-bold">
              Monthly Sales Per Year
            </h1>
            <SalesChart />
          
      </div>
    </main>
  );
}
