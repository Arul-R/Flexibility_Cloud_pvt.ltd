// server/src/server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const path = require('path'); // Added for file path handling
const multer = require('multer'); // Added for file uploads

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const enquiryRoutes = require('./routes/enquiry.routes');
const applicantRoutes = require('./routes/applicants.routes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
// app.use(cors());
// Custom CORS options if needed
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Your Angular app URL
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Added Authorization
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File upload middleware (added for applicants)
app.use(express.urlencoded({ extended: true })); // For form data

// Mount routers
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/applicants', applicantRoutes);

// Serve uploaded files (added for applicants' resumes)
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Ensure uploads directory exists (added for applicants)
const fs = require('fs');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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

// Error handling middleware for file uploads (added for applicants)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload error'
    });
  } else if (err) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal server error'
    });
  }
  next();
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
