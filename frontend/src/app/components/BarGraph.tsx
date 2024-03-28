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
  // Define a mapping of years to colors
  const colorMap = {
    "2003": "#1f77b4",
    "2004": "#ff7f0e",
    "2005": "#2ca02c",
  };

  // Generate an array of colors based on the year
  const colors = data.map((item) => colorMap[item.YEAR_ID]);

  const chartData = {
    labels: data.map((item) => item.YEAR_ID),
    datasets: [
      {
        label: "Sales",
        data: data.map((item) => item.SALES),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Total Sales between 2003-2005",
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: "500px", height: "300px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarGraph;
