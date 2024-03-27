const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
const port = 5000;

// app.get("/read-csv", (req, res) => {
//   let data = [];
//   fs.createReadStream("./sales_data_sample.csv")
//     .pipe(csv())
//     .on("data", (row) => {
//       // Process the data
//       // Process the data
//       let processedRow = processData(row);
//       data.push(processedRow);
//     })
//     .on("end", () => {
//       res.send(data);
//     })
//     .on("error", (err) => {
//       console.error(err);
//       res.status(500).send("An error occurred while reading the CSV file.");
//     });
// });

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
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
