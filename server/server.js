// server/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Middleware
// Allow requests from any origin
app.use(cors({ origin: '*' }));
app.use(express.json());

// --- Routes ---
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/auth', require('./routes/auth')); // --- Add auth routes

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
