const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const adminRouter = require('./routes/admin');
const employeeRouter = require('./routes/employee');
const hiringRouter = require('./routes/hiring');
const evaluationsRouter = require('./routes/evaluations');

const app = express();

// Security configurations
app.use(helmet());
app.use(compression());


// MongoDB connection
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error('MongoDB connection error:', error.message));

// Memory monitoring middleware
// app.use((req, res, next) => {
//   const startMemory = process.memoryUsage().heapUsed;
//   res.on('finish', () => {
//     const endMemory = process.memoryUsage().heapUsed;
//     const memoryUsed = (endMemory - startMemory) / 1024 / 1024; // Convert to MB
//     if (memoryUsed > 50) { // Alert if single request uses more than 50MB
//       console.warn(`High memory usage (${memoryUsed.toFixed(2)}MB) on ${req.method} ${req.url}`);
//     }
//   });
//   next();
// });

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const port = process.env.PORT || 3000;
console.log(`Server running on port ${port}`);


// Request timeout middleware
app.use((req, res, next) => {
  res.setTimeout(30000, () => {
    if (!res.headersSent) {
      res.status(408).json({ 
        status: 0, 
        message: "Request Timeout",
        data: []
      });
    }
  });
  next();
});

// Cache control middleware
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Basic middleware
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));  // Add limit to JSON body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Prevent directory listing
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.on('finish', () => {
    console.log(`Response Status: ${res.statusCode}`);
  });
  next();
});

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/hiring', hiringRouter);
app.use('/api/evaluations', evaluationsRouter);

// 404 handler - Note: Changed from 500 to 404 as this is a not found handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 0,
    message: "Not Found ======",
    data: []
  });
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  console.error(err);  // Log errors
  
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;