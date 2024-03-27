"use client";
// Import necessary components
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

// Define the props type
interface Props {
  data: DataItem[];
}

interface DataItem {
  YEAR_ID: string;
  SALES: number;
}

const BarGraph: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.YEAR_ID),
    datasets: [
      {
        label: "Sales",
        data: data.map((item) => item.SALES),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "800px", height: "600px" }}>
      <Bar data={chartData} />
    </div>
  );
};

export default BarGraph;
