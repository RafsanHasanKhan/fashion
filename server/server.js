
const app = require('./index')

// Port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to the Express-MongoDB Server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});