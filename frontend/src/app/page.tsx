import Image from "next/image";

async function getData() {
  const res = await fetch("http://localhost:5000/read-csv");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data2 = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* This is a Next.js app with Tailwind CSS // If you meant to render a
      collection of children, use an array instead. */}
      <h1 className="text-4xl font-bold">CSV Data</h1>

      <ul className="flex flex-col items-center justify-center">
        {data2.map((item: any) => (
          <li key={item.YEAR_ID} className="text-lg">
            {item.SALES} = {item.YEAR_ID}
          </li>
        ))}
      </ul>
    </main>
  );
}
