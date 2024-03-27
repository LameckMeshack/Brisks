
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* This is a Next.js app with Tailwind CSS // If you meant to render a
      collection of children, use an array instead. */}
      <h1 className="text-4xl font-bold">CSV Data</h1>
      {/* ADD THE PIECHART HERE */}
      <SalesPieChart data={data} />
    </main>
  );
}
