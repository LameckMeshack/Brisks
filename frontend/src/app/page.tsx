
import SalesPieChart  from "./components/SalesPieChart";

interface DataItem {
  YEAR_ID: string;
  SALES: number;
}

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
    <main className="flex min-h-screen  items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold">CSV Data</h1>
        <SalesPieChart data={data} />
      </div>
    </main>
  );
}
