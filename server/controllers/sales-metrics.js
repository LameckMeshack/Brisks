const csv = require("csv-parser");

function processData(row, filterYear) {
  if (filterYear && parseInt(row.YEAR_ID) !== parseInt(filterYear)) {
    return null; // Skip row if it doesn't match filter year
  }

  return {
    SALES: parseFloat(row.SALES),
    QUANTITYORDERED: parseFloat(row.QUANTITYORDERED),
    PRICEEACH: parseFloat(row.PRICEEACH),
  };
}

async function calculateMetrics(data) {
  const metrics = { sales: 0, totalQuantity: 0, totalCost: 0 };
  let orderCount = 0;

  for (const row of data) {
    const processedRow = processData(row, req.query.year); // Use query param for filtering
    if (!processedRow) continue; // Skip row if filtered out

    metrics.sales += processedRow.SALES;
    metrics.totalQuantity += processedRow.QUANTITYORDERED;
    metrics.totalCost += processedRow.QUANTITYORDERED * processedRow.PRICEEACH;
    orderCount++;
  }

  metrics.profitMargin = (metrics.sales - metrics.totalCost) / metrics.sales;
  metrics.averageOrderValue = metrics.sales / orderCount;
  return metrics;
}

async function processCsvAndCalculateMetrics(filePath) {
  const csvData = [];
  const stream = fs.createReadStream(filePath).pipe(csv());

  for await (const row of stream) {
    csvData.push(row);
  }

  const metrics = await calculateMetrics(csvData);
  return metrics;
}

module.exports = processCsvAndCalculateMetrics;
