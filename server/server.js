const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
const port = 5000;


app.get("/read-csv", (req, res) => {
  let data = {};
  fs.createReadStream("./sales_data_sample.csv")
    .pipe(csv())
    .on("data", (row) => {
      // Process the data
      let processedRow = processData(row);
      if (data[processedRow.YEAR_ID]) {
        data[processedRow.YEAR_ID] += parseFloat(processedRow.SALES);
      } else {
        data[processedRow.YEAR_ID] = parseFloat(processedRow.SALES);
      }
    })
    .on("end", () => {
      // Convert the aggregated data object into an array of objects
      const aggregatedData = Object.keys(data).map((year) => ({
        YEAR_ID: year,
        SALES: data[year],
      }));
      res.send(aggregatedData);
    })
    .on("error", (err) => {
      console.error(err);
      res.status(500).send("An error occurred while reading the CSV file.");
    });
});

// Handle data encoding, parsing dates, and managing any missing or anomalous data.

// Handle data encoding, parsing dates, and managing any missing or anomalous data.
function processData(row) {
  for (let key in row) {
    if (row[key] === "") {
      row[key] = "N/A";
    } else if (key === "ORDERDATE") {
      row[key] = new Date(row[key]);
    } else if (key === "SALES" || key === "PRICEEACH") {
      row[key] = parseFloat(row[key]).toFixed(2);
    }
  }
  return {
    YEAR_ID: row["YEAR_ID"],
    SALES: row["SALES"],
  };
}


// Function to calculate Profit Margin and AOV
async function calculateMetrics(data) {
  const metrics = { sales: 0, totalQuantity: 0, totalCost: 0 };
  let orderCount = 0;

  // Process each row of CSV data
  for (const row of data) {
    // Apply filtering if any (assuming 'year' filter example)
    if (data.year && parseInt(row.YEAR_ID) !== parseInt(data.year)) continue;
    // ... similar for other filters

    metrics.sales += parseFloat(row.SALES);
    metrics.totalQuantity += parseFloat(row.QUANTITYORDERED);
    metrics.totalCost += parseFloat(row.QUANTITYORDERED) * parseFloat(row.PRICEEACH);
    orderCount++;
  }

  metrics.profitMargin = (metrics.sales - metrics.totalCost) / metrics.sales;
  metrics.averageOrderValue = metrics.sales / orderCount;
  return metrics;
}

// API endpoint (assuming Express.js)
app.get('/sales-metrics', async (req, res) => {
  const filterParams = req.query; // Get any filter parameters from query string

  try {
    // Read CSV data into an array (suitable for smaller datasets)
    const csvData = [];
    const csvStream = fs.createReadStream('./sales_data_sample.csv');
    csvStream.pipe(csv())
      .on('data', (row) => csvData.push(row))
      .on('end', async () => {
        const metrics = await calculateMetrics(csvData);// You can remove this for production
        res.json(metrics);
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching metrics');
  }
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
