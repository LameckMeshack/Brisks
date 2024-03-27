"use client"
// Import necessary components
import { Bar } from 'react-chartjs-2';

// Define the props type
interface Props {
  data: {
    sales: number;
    totalQuantity: number;
    totalCost: number;
    profitMargin: number;
    averageOrderValue: number;
  };
}

const SalesMatrix: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Sales Metrics",
        data: Object.values(data),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default SalesMatrix;