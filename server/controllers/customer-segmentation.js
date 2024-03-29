const fs = require("fs");
const csv = require("csv-parser");

function segmentCustomers(data) {
  const segments = {
    Low: [],
    Medium: [],
    High: [],
  };

  const thresholdLow = 100; // Adjust thresholds as needed
  const thresholdHigh = 500;

  for (const row of data) {
    const sales = parseFloat(row.SALES);
    let segment;

    if (sales < thresholdLow) {
      segment = "Low";
    } else if (sales >= thresholdHigh) {
      segment = "High";
    } else {
      segment = "Medium";
    }

    segments[segment].push(row);
  }

  return segments;
}

async function processCustomerData(filePath) {
  const data = [];
  const stream = fs.createReadStream(filePath).pipe(csv());

  for await (const row of stream) {
    data.push(row);
  }

  return segmentCustomers(data);
}

module.exports = processCustomerData;
