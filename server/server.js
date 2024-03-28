const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    // credentials: true, // Optional: Allow cookies if needed
  })
);

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
    if (data.year && parseInt(row.YEAR_ID) !== parseInt(data.year)) continue;
    metrics.sales += parseFloat(row.SALES);
    metrics.totalQuantity += parseFloat(row.QUANTITYORDERED);
    metrics.totalCost +=
      parseFloat(row.QUANTITYORDERED) * parseFloat(row.PRICEEACH);
    orderCount++;
  }

  metrics.profitMargin = (metrics.sales - metrics.totalCost) / metrics.sales;
  metrics.averageOrderValue = metrics.sales / orderCount;
  return metrics;
}

// API endpoint (assuming Express.js)
app.get("/sales-metrics", async (req, res) => {
  const filterParams = req.query; // Get any filter parameters from query string

  try {
    const csvData = [];
    const csvStream = fs.createReadStream("./sales_data_sample.csv");
    csvStream
      .pipe(csv())
      .on("data", (row) => csvData.push(row))
      .on("end", async () => {
        const metrics = await calculateMetrics(csvData); // You can remove this for production
        res.json(metrics);
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching metrics");
  }
});

app.post("/sales-data", (req, res) => {
  const requestedYear = req.body.year;

  // Initialize an array with all months (1-12) to ensure inclusion
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthlyTotals = {};

  const stream = fs.createReadStream("./sales_data_sample.csv").pipe(csv());

  stream.on("error", (error) => {
    console.error(error);
    res.status(500).send("Error reading data");
  });

  stream.on("data", (row) => {
    if (row.YEAR_ID === requestedYear) {
      const month = parseInt(row.MONTH_ID, 10);
      const sales = parseFloat(row.SALES);

      // Ensure month is included in monthlyTotals with 0 if missing
      monthlyTotals[month] = monthlyTotals[month] || 0; // Set to 0 if not yet added

      // Add current sale value to the corresponding month's total
      monthlyTotals[month] += sales;
    }
  });

  stream.on("end", () => {
    const salesData = {
      labels: months.map(
        (month) =>
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ][month - 1]
      ), // Map month numbers to labels
      datasets: [
        {
          label: `Sales by Month for ${requestedYear}`,
          data: months.map((month) => monthlyTotals[month]), // Map month numbers to totals (using 0 if missing)
          borderColor: "blue",
          backgroundColor: "#343fba",
        },
      ],
    };

    res.json(salesData);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
