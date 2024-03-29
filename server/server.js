const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");

const bodyParser = require("body-parser");
const cors = require("cors");
const { Colors } = require("chart.js");
const errorHandler = require("./utils/error-handler");
const processSalesData = require("./controllers/sales-data");
const processCsv = require("./controllers/ csv-processor");
const yearFilter = require("./controllers/sales-data-processor");

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    // credentials: true, // Optional: Allow cookies if needed
  })
);

app.use(errorHandler);

app.get("/sales-data-by-year", async (req, res) => {
  try {
    const salesData = await processSalesData("./sales_data_sample.csv");
    res.json(salesData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing sales data");
  }
});

app.get("/read-csv", async (req, res) => {
  try {
    const aggregatedData = await processCsv("./sales_data_sample.csv");
    res.send(aggregatedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while reading the CSV file.");
  }
});

app.get("/sales-metrics", async (req, res) => {
  try {
    const metrics = await processCsvAndCalculateMetrics(
      "./sales_data_sample.csv"
    );
    res.json(metrics);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching metrics");
  }
});



app.post("/sales-data", async (req, res) => {
  try {
    const { year } = req.body; // Extract year from request body
    const salesData = await yearFilter("./sales_data_sample.csv", year); // Use imported function
    res.json(salesData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing sales data");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
