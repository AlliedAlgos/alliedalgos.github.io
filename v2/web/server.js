const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Example API route
app.get('/api/data', async (req, res) => {
  // You can fetch from Firebase here
  res.json({ message: "Hello from Firebase backend!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
