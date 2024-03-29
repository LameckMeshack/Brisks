// import { CategoryScale } from "chart.js";
// import Chart from "chart.js/auto";
import SalesChart from "../components/MonthlyChart";
import SalesByYearChart from "../components/SalesByYear";
interface DataItem {
  YEAR_ID: string;
  SALES: number;
}

// Chart.register(CategoryScale);

export default async function Months() {
  return (
    // <main>
    //   <div className="flex">
    //     <div className="flex flex-col p-4 gap-4 w-11/12 bg-gray-200 ">
    //       <h1 className="text-4xl text-black font-bold">
    //         Monthly Sales Per Year
    //       </h1>
    //       <SalesChart />
    //     </div>
    //   </div>
    //   <div className="flex">
    //     <div className="flex flex-col p-4 gap-4 w-11/12 bg-gray-200 ">
    //       <h1 className="text-4xl text-black font-bold">
    //         Monthly Sales Per Year
    //       </h1>
    //       <SalesByYearChart />
    //     </div>
    //   </div>
    // </main>

    <main className="flex">
      <div className="flex flex-col p-4 gap-4 w-11/12 bg-gray-200 ">
        <div className="flex-1 grid gap-4 grid-cols-1 md:grid-cols-2 ">
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4">
            <h1 className="text-4xl text-black font-bold">
              Monthly Sales Per Year
            </h1>
            <SalesChart />
          </div>
        </div>
        <div className="">
          
          <SalesByYearChart />
        </div>
      </div>
    </main>
  );
}
