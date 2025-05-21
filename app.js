const express = require('express');
const path = require('path');
const app = express();

// Use 'public' folder to serve static files like CSS, images, JS
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html when visiting the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Let Render know which port to listen on
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`CRW Homeworld server running on port ${port}`);
});
