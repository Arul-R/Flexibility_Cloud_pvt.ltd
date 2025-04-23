// server/src/server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const enquiryRoutes = require('./routes/enquiry.routes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
// app.use(cors());
// Custom CORS options if needed
app.use(cors({
  origin: 'http://localhost:4200',  // Your Angular app URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/enquiries', enquiryRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Enquiry Registration API.' });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Not found - ${req.originalUrl}`
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});