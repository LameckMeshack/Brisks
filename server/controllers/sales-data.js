const fs = require("fs");
const csv = require("csv-parser");

async function processSalesData(filePath) {
  const yearData = {};
  const labels = [
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
  ];

  const stream = fs.createReadStream(filePath).pipe(csv());

  for await (const row of stream) {
    const year = parseInt(row.YEAR_ID, 10);
    const month = parseInt(row.MONTH_ID, 10);
    const sales = parseFloat(row.SALES);

    yearData[year] = yearData[year] || {};
    yearData[year][month] = (yearData[year][month] || 0) + sales; 
  }

  const datasets = [];
  for (const year in yearData) {
    const monthlyTotals = yearData[year];
    const data = [];
    for (let i = 1; i <= 12; i++) {
      data.push(monthlyTotals[i] || 0);
    }
    datasets.push({
      label: `Year ${year}`,
      data,
      borderColor: `#${
        year === "2003" ? "1f77b4" : year === "2004" ? "ff7f0e" : "2ca02c"
      }`,
    });
  }

  return { labels, datasets };
}

module.exports = processSalesData;
