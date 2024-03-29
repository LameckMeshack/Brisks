"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

const SalesByYearChart = () => {
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/sales-data-by-year"); // Assuming the backend endpoint is GET /api/sales-data-by-year

      if (!response.ok) {
        console.error("Error fetching data");
        return;
      }

      const data = await response.json();
      setSalesData(data);
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true, // Start y-axis at zero for better sales representation
          },
        },
      ],
    },
  };

  return (
    <div className="container bg-white mx-auto w-full text-black p-4">
      <h1 className="font-semibold ">Monthly Comparison Per Year</h1>
      {salesData && (
        <div className="mt-4 w-full  h-96">
          <div className="w-full h-full">
            <Line data={salesData} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesByYearChart;
