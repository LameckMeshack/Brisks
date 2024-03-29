const fs = require("fs");
const csv = require("csv-parser");

function yearFilter(filePath, requestedYear) {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthlyTotals = {};

  const stream = fs.createReadStream(filePath).pipe(csv());

  return new Promise((resolve, reject) => {
    stream.on("error", reject);

    stream.on("data", (row) => {
      if (row.YEAR_ID === requestedYear) {
        const month = parseInt(row.MONTH_ID, 10);
        const sales = parseFloat(row.SALES);

        monthlyTotals[month] = monthlyTotals[month] || 0; // Ensure month exists with 0 if missing
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
            backgroundColor: `#${
              requestedYear === "2003"
                ? "1f77b4"
                : requestedYear === "2004"
                ? "ff7f0e"
                : "2ca02c"
            }`,
          },
        ],
      };
      resolve(salesData); // Resolve the promise with processed data
    });
  });
}

module.exports = yearFilter;
