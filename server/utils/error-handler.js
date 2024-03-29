module.exports = (err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).send("Error processing sales data"); 
  next(); 
};
