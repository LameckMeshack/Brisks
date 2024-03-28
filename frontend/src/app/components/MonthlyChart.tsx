"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

const SalesChart = () => {
  const [salesData, setSalesData] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2003"); // Initial year

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/sales-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year: selectedYear }),
      });

      if (!response.ok) {
        console.error("Error fetching data");
        return;
      }

      const data = await response.json();
      setSalesData(data);
    };

    fetchData();
  }, [selectedYear]); // Refetch data on year change

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  // Options for customizing the bar chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          ticks: {
            minRotation: 45, // Rotate labels for better readability
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true, // Start y-axis at zero
          },
        },
      ],
    },
  };

  return (
    <div className="container text-black mx-auto p-4">
      <h1 className='font-semibold'> Sales Chart - Year: {selectedYear}</h1>
      <select
        value={selectedYear}
        onChange={handleYearChange}
        className="mt-1 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="2003">2003</option>
        <option value="2004">2004</option>
        <option value="2005">2005</option>
      </select>
      {salesData && (
        <div className="mt-4">
          <Bar data={salesData} options={options} />
        </div>
      )}
    </div>
  );
};

export default SalesChart;
