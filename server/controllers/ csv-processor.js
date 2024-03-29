const fs = require("fs");
const csv = require("csv-parser");
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

async function processCsv(filePath) {
  const data = {};

  const stream = fs.createReadStream(filePath).pipe(csv());

  for await (const row of stream) {
    const processedRow = processData(row);
    if (data[processedRow.YEAR_ID]) {
      data[processedRow.YEAR_ID] += processedRow.SALES;
    } else {
      data[processedRow.YEAR_ID] = processedRow.SALES;
    }
  }

  const aggregatedData = Object.keys(data).map((year) => ({
    YEAR_ID: year,
    SALES: data[year],
  }));

  return aggregatedData;
}

module.exports = processCsv;
